// api/auth.ts
import { Handler } from "@netlify/functions";
import { auth } from "../src/lib/auth";

export const handler: Handler = async (event, _context) => {
  try {
    console.log('🚀 Auth API called:', {
      method: event.httpMethod,
      path: event.path,
      origin: event.headers.origin,
      userAgent: event.headers['user-agent'],
    });

    const url = new globalThis.URL(event.rawUrl);
    const request = new globalThis.Request(url.toString(), {
      method: event.httpMethod,
      headers: event.headers as globalThis.HeadersInit,
      body: event.body ? event.body : undefined,
    });

    console.log('📤 Processing auth request...');
    const response = await auth.handler(request);
    
    console.log('📥 Auth response status:', response.status);
    
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const responseBody = await response.text();
    
    if (response.status >= 400) {
      console.log('❌ Auth error response:', {
        status: response.status,
        body: responseBody.substring(0, 500), // Log first 500 chars
      });
    }

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
    };
    
  } catch (error: any) {
    console.log('💥 Auth handler error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};