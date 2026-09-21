import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://127.0.0.1:4000';

async function extractClasses() {
  console.log('Extracting custom Tailwind classes from Payload...');
  const safelist = new Set<string>();

  try {
    const res = await fetch(`${PAYLOAD_URL}/api/pages?limit=1000`);
    if (!res.ok) {
      console.warn(`Could not fetch pages: ${res.statusText}`);
      return;
    }
    
    const data = await res.json();
    
    if (data?.docs) {
      data.docs.forEach((page: any) => {
        if (page.layout && Array.isArray(page.layout)) {
          page.layout.forEach((block: any) => {
            if (block.customClasses) {
              const classes = block.customClasses.split(' ').filter(Boolean);
              classes.forEach((c: string) => safelist.add(c.trim()));
            }
          });
        }
      });
    }

    const classesArray = Array.from(safelist);
    const outputPath = path.resolve(__dirname, '../src/tailwind-safelist.txt');
    
    if (classesArray.length > 0) {
      fs.writeFileSync(outputPath, classesArray.join(' '));
      console.log(`Saved ${classesArray.length} classes to ${outputPath}`);
    } else {
      // Write an empty file so Tailwind doesn't throw a missing file error
      fs.writeFileSync(outputPath, '');
      console.log('No custom classes found. Created empty safelist file.');
    }

  } catch (err) {
    console.warn('Failed to extract classes (is Payload running?):', err);
  }
}

extractClasses();
