-- BerkshireIQ Database Initialization Script
-- Run this after creating the database and installing pgvector extension

-- Create the main documents table
CREATE TABLE IF NOT EXISTS berkshire_docs (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(1536),
    year INTEGER,
    source TEXT,
    pages TEXT,
    period TEXT,
    chunk_number INTEGER,
    document TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS berkshire_docs_embedding_idx 
ON berkshire_docs USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for year filtering
CREATE INDEX IF NOT EXISTS berkshire_docs_year_idx ON berkshire_docs(year);

-- Create index for period filtering
CREATE INDEX IF NOT EXISTS berkshire_docs_period_idx ON berkshire_docs(period);

-- Verify table creation
SELECT 
    tablename, 
    schemaname 
FROM pg_tables 
WHERE tablename = 'berkshire_docs';

-- Show table structure
\d berkshire_docs
