import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
console.log('process.env.TURSO_DATABASE_URL: ', process.env.TURSO_DATABASE_URL);
console.log('process.env.TURSO_AUTH_TOKEN: ', process.env.TURSO_AUTH_TOKEN);

export default defineConfig({
  out: './src/db',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
