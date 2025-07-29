// scripts/generateRegistryTypes.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON files directly
const landingUsagesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/registry/registry-data/landingUsages.json'), 'utf8')
);
const authUsagesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/registry/registry-data/authUsages.json'), 'utf8')
);
const statsAndFeaturesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/registry/registry-data/statsAndFeatures.json'), 'utf8')
);
const newData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/registry/registry-data/newUsages.json'), 'utf8')
);

// Collect all IDs from all JSON files
const allUsages = [
  ...landingUsagesData,
  ...authUsagesData,
  ...statsAndFeaturesData,
  ...newData
];

const allIds = allUsages.map(usage => usage.id).sort();

console.log(`📋 Found ${allIds.length} component IDs across all JSON files`);

// Generate the TypeScript file with literal union types
const typeContent = `// This file is auto-generated from JSON registry data
// Generated on ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - Run 'npm run generate-types' to regenerate

export type ComponentRegistryId = 
${allIds.map(id => `  | '${id}'`).join('\n')}
  | 'noID'; // Allow noID for temporary/untracked components

// Runtime validation array
export const VALID_COMPONENT_IDS = [
${allIds.map(id => `  '${id}',`).join('\n')}
  'noID'
] as const;

// Type guard for runtime validation
export function isValidComponentId(id: string): id is ComponentRegistryId {
  return VALID_COMPONENT_IDS.includes(id as ComponentRegistryId);
}

// Helper to validate component ID with helpful error messages
export function validateComponentId(id: string): asserts id is ComponentRegistryId {
  if (!isValidComponentId(id)) {
    const suggestions = VALID_COMPONENT_IDS
      .filter(validId => validId !== 'noID')
      .filter(validId => validId.includes(id) || id.includes(validId))
      .slice(0, 5);
    
    const suggestionText = suggestions.length > 0 
      ? \`\\nDid you mean: \${suggestions.join(', ')}?\`
      : '';
    
    throw new Error(
      \`Invalid component ID: "\${id}"\${suggestionText}\\n\` +
      \`Available IDs: \${VALID_COMPONENT_IDS.slice(0, 10).join(', ')}\` +
      \`\${VALID_COMPONENT_IDS.length > 10 ? \` ... and \${VALID_COMPONENT_IDS.length - 10} more\` : ''}\`
    );
  }
}

// Export count for debugging
export const COMPONENT_ID_COUNT = ${allIds.length};
`;

// Write the generated types file
const outputPath = path.join(__dirname, '../src/registry/generatedTypes.ts');
fs.writeFileSync(outputPath, typeContent);

console.log(`✅ Generated TypeScript types to: ${outputPath}`);
console.log(`🎯 TypeScript will now catch invalid component IDs at build time!`);
console.log(`📝 Component IDs: ${allIds.slice(0, 5).join(', ')}${allIds.length > 5 ? '...' : ''}`);