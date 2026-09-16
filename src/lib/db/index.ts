import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Use mock connection for development if DATABASE_URL is not provided
const getDb = () => {
  if (!connectionString) {
    console.warn('DATABASE_URL is not set. Database connections will fail or rely on mock data.');
    // We cast to any to allow the app to compile and run without a real DB during early dev
    return {} as ReturnType<typeof drizzle>;
  }
  
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
};

export const db = getDb();
