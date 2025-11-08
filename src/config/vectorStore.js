import pg from 'pg';
import { getValidatedConfig } from './api.js';

// Get validated configuration
const config = getValidatedConfig();

// PostgreSQL connection pool
const pool = new pg.Pool({
  connectionString: config.database.url,
});

// Vector store configuration
export const vectorStore = {
  pool,
  tableName: 'berkshire_docs',
  vectorDimensions: 1536,
  
  async connect() {
    return await pool.connect();
  },
  
  async query(text, params) {
    return await pool.query(text, params);
  }
};

// Enhanced test connection function
export async function testConnection() {
  let client;
  try {
    client = await vectorStore.connect();
    // Test both PostgreSQL and vector extension
    await client.query('SELECT 1');
    const pgVectorCheck = await client.query(
      'SELECT * FROM pg_extension WHERE extname = $1', 
      ['vector']
    );
    
    if (pgVectorCheck.rows.length === 0) {
      throw new Error('PgVector extension not installed');
    }

    console.log('✅ Database connection successful | PgVector active');
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  } finally {
    if (client) await client.release();
  }
}