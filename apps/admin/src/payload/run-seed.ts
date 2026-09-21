import { Buffer } from 'node:buffer';
process.env.PAYLOAD_CONFIG_PATH = 'src/payload/payload.config.ts';

import { getPayload } from 'payload';
import configPromise from './payload.config';
import { seed } from './seed';
import 'dotenv/config'; // Load .env.local if present, or we can just rely on process.env 

const run = async () => {
    try {
        const payload = await getPayload({ config: configPromise });
        await seed(payload);
        console.log("Seeding complete!");
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

run();
