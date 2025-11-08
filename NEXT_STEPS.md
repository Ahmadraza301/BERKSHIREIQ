# 🚀 Next Steps to Run BerkshireIQ

## Current Status
✅ All code errors fixed
✅ API configuration validated  
⚠️ Database setup required

## What You Need to Do

### Step 1: Install PostgreSQL

**Choose the easiest option for you:**

#### Option A: PostgreSQL Installer (Recommended for Windows)
1. Download: https://www.postgresql.org/download/windows/
2. Run installer, set password to: `421302`
3. Complete installation (takes ~5 minutes)

#### Option B: Docker (If you have Docker)
```bash
docker run --name berkshire-postgres \
  -e POSTGRES_PASSWORD=421302 \
  -e POSTGRES_DB=421302 \
  -p 5432:5432 \
  -d ankane/pgvector
```

### Step 2: Set Up Database
After PostgreSQL is installed:

```bash
# Create database
psql -U postgres -c "CREATE DATABASE \"421302\";"

# Install pgvector extension
psql -U postgres -d 421302 -c "CREATE EXTENSION vector;"

# Create tables
psql -U postgres -d 421302 -f scripts/init-db.sql
```

### Step 3: Verify Setup
```bash
npm run check-db
```

### Step 4: Ingest Data
```bash
node scripts/ingest.js
```

### Step 5: Run the App
```bash
npm run dev
```

## Quick Commands Reference

```bash
# Check database status
npm run check-db

# Test configuration
npm run test-config

# Test OpenAI connection
npm run test-openai

# Start development server
npm run dev
```

## Need More Help?

- **Detailed setup:** See `SETUP_GUIDE.md`
- **Error details:** See `ERROR_REPORT.md`
- **Project overview:** See `README.md`

## Estimated Time
- PostgreSQL installation: 5-10 minutes
- Database setup: 2 minutes
- Data ingestion: 5-10 minutes (depending on PDF count)
- **Total: ~20 minutes to get running**
