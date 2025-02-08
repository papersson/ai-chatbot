// Explicitly mark as Node.js module
export const runtime = "nodejs";

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined');
}

const client = postgres(process.env.POSTGRES_URL, { 
  max: 1,
  prepare: false,
  connection: {
    // Disable SSL verification for local development
    ssl: process.env.NODE_ENV === 'production'
  }
});

export const db = drizzle(client); 