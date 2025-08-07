import { PGVectorStore } from '@mastra/core';
import { OpenAIEmbeddings } from '@mastra/core/embeddings';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Configuration for document embeddings
const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-large',
  dimensions: 1536
});

// PostgreSQL vector store configuration
export const vectorStore = new PGVectorStore({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/berkshire_rag',
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

// Test connection function
export async function testConnection() {
  try {
    await vectorStore.client.query('SELECT 1');
    console.log('✅ Vector store connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Vector store connection failed:', error.message);
    return false;
  }
}