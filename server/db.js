import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const supabaseUrl = process.env.DATABASE_URL_POOL || process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL;
const useSupabase = !!supabaseUrl && process.env.USE_LOCAL_DB !== 'true';

const db = useSupabase
  ? new Pool({ connectionString: supabaseUrl, ssl: { rejectUnauthorized: false }})
  : new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

console.log(`Supabase Mode: ${useSupabase}`);
export default db;
