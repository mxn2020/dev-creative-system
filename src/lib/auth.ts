import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Create MongoDB client
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/vite-react-mongo";

// Debug logging for deployment issues
console.log('🔧 Better Auth Configuration Debug:');
console.log('  - MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('  - DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('  - BETTER_AUTH_SECRET present:', !!process.env.BETTER_AUTH_SECRET);
console.log('  - BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
console.log('  - Using MongoDB URI:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//[credentials]@')); // Mask credentials

// Initialize MongoDB client with error handling
let client: MongoClient;
let authInstance: any;

try {
  client = new MongoClient(mongoUri);
  console.log('✅ MongoDB client created successfully');
} catch (error: any) {
  console.error('❌ Failed to create MongoDB client:', error.message);
  throw new Error(`MongoDB client initialization failed: ${error.message}`);
}

// Create auth instance with MongoDB adapter
try {
  authInstance = betterAuth({
    database: mongodbAdapter(client.db()),
    secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-change-this-in-production-min-32-chars",
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 24 hours
    },
    trustedOrigins: [
      process.env.BETTER_AUTH_URL || "http://localhost:5176",
      "http://localhost:8889",
      "https://localhost:8889",
      // Add specific site URL if provided
      ...(process.env.SITE_URL ? [process.env.SITE_URL] : []),
      ...(process.env.URL ? [process.env.URL] : []),
      // Add current Netlify deployment URL
      ...(process.env.DEPLOY_URL ? [process.env.DEPLOY_URL] : []),
      ...(process.env.DEPLOY_PRIME_URL ? [process.env.DEPLOY_PRIME_URL] : []),
    ],
  });
  console.log('✅ Better Auth instance created successfully');
} catch (error: any) {
  console.error('❌ Failed to create Better Auth instance:', error.message);
  throw new Error(`Better Auth initialization failed: ${error.message}`);
}

export const auth = authInstance;