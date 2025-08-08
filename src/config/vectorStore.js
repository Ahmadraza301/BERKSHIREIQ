import { PGVectorStore, OpenAIEmbeddings } from '@mastra/core'; // Combined import
import { getValidatedConfig } from './api.js';

// Get validated configuration
const config = getValidatedConfig();

// Configuration for document embeddings
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-large',
  dimensions: 1536
});

// PostgreSQL vector store configuration
export const vectorStore = new PGVectorStore({
  connectionString: config.database.url,
  embeddings,
  tableName: 'berkshire_docs',
  metadataColumns: [
    'year',
    'source',
    'pages',
    'period'
  ],
  vectorDimensions: 1536
});

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