# BerkshireIQ Setup Guide

## Current Status
✅ Configuration validated (API keys working)
✅ Code syntax errors fixed
⚠️ PostgreSQL database needs to be set up

## Required Steps to Run the Project

### 1. Install PostgreSQL

**Windows Installation:**
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer (recommended version: 15 or higher)
3. During installation:
   - Set password for postgres user (use: 421302 to match your .env)
   - Default port: 5432
   - Remember to add PostgreSQL to PATH

**Alternative - Using Docker:**
```bash
docker run --name berkshire-postgres -e POSTGRES_PASSWORD=421302 -p 5432:5432 -d postgres:15
```

### 2. Install pgvector Extension

After PostgreSQL is installed:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE "421302";

-- Connect to the database
\c 421302

-- Install pgvector extension
CREATE EXTENSION vector;

-- Verify installation
SELECT * FROM pg_extension WHERE extname = 'vector';
```

### 3. Create Database Tables

Run this SQL to create the required table:

```sql
CREATE TABLE berkshire_docs (
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
CREATE INDEX ON berkshire_docs USING ivfflat (embedding vector_cosine_ops);
```

### 4. Verify Setup

```bash
# Test configuration
npm run test-config

# Test database connection
node scripts/db-test.js

# Test OpenAI API
npm run test-openai
```

### 5. Ingest Data

```bash
# Process and index shareholder letters
node scripts/ingest.js
```

### 6. Run the Project

```bash
# Development mode
npm run dev

# Or build and start
npm run build
npm start
```

## Quick Start (If PostgreSQL is Already Installed)

```bash
# 1. Create database and extension
psql -U postgres -c "CREATE DATABASE \"421302\";"
psql -U postgres -d 421302 -c "CREATE EXTENSION vector;"

# 2. Create tables (run the SQL above)

# 3. Test everything
npm run test-config
node scripts/db-test.js

# 4. Ingest data
node scripts/ingest.js

# 5. Start the app
npm run dev
```

## Troubleshooting

### PostgreSQL Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check connection string in .env matches your setup
- Ensure port 5432 is not blocked by firewall

### pgvector Extension Issues
- pgvector might need separate installation on some systems
- See: https://github.com/pgvector/pgvector#installation

### API Key Issues
- Verify your OpenAI API key is valid
- Check you have sufficient credits
- Run: `npm run test-openai`
