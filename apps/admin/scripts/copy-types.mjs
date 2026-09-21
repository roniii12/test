import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(__dirname, '../src/payload/generated-types.ts');
const dest = path.resolve(__dirname, '../../../packages/types/src/payload-types.ts');

try {
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log('✅ Successfully copied payload-types.ts to @repo/types/src/index.ts');
  } else {
    console.error('❌ Source file payload-types.ts not found. Did you run payload generate:types?');
  }
} catch (error) {
  console.error('❌ Failed to copy types.', error);
}
