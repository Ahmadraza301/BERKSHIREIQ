# 🚀 BerkshireIQ Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

**Steps:**
1. Push code to GitHub (see below)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: Your PostgreSQL connection string (see database options below)
6. Click "Deploy"
7. Your app will be live at: `https://your-project.vercel.app`

### Option 2: Railway (Includes Free PostgreSQL)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

**Steps:**
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add PostgreSQL service:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will auto-create `DATABASE_URL`
6. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
7. Install pgvector extension:
   ```bash
   railway run psql $DATABASE_URL -c "CREATE EXTENSION vector;"
   ```
8. Deploy and get your live URL

### Option 3: Render (Free Tier Available)

**Steps:**
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: Your PostgreSQL URL
7. Click "Create Web Service"

### Option 4: Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site settings
7. Deploy

## 📦 Push to GitHub

### First Time Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: BerkshireIQ project"

# Create repository on GitHub
# Go to github.com → New Repository → Create "BerkshireIQ"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/BerkshireIQ.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Update Existing Repository

```bash
# Add changes
git add .

# Commit
git commit -m "Prepare for deployment"

# Push
git push origin main
```

## 🗄️ Database Options for Production

### Option 1: Supabase (Free Tier - Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Enable pgvector:
   ```sql
   CREATE EXTENSION vector;
   ```
5. Use connection string as `DATABASE_URL`

### Option 2: Neon (Serverless PostgreSQL)
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Get connection string
4. Enable pgvector in SQL Editor:
   ```sql
   CREATE EXTENSION vector;
   ```
5. Use connection string as `DATABASE_URL`

### Option 3: Railway PostgreSQL
1. Included with Railway deployment
2. Automatically configured
3. Just enable pgvector extension

### Option 4: ElephantSQL (Free Tier)
1. Go to [elephantsql.com](https://elephantsql.com)
2. Create new instance (Tiny Turtle - Free)
3. Get connection URL
4. Note: May need to install pgvector separately

## 🔧 Environment Variables

Set these in your hosting platform:

```env
OPENAI_API_KEY=sk-proj-your-key-here
DATABASE_URL=postgresql://user:password@host:5432/database
LOG_LEVEL=info
```

## 📊 After Deployment

### 1. Initialize Database

Connect to your production database and run:

```sql
-- Create extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS berkshire_docs_embedding_idx 
ON berkshire_docs USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS berkshire_docs_year_idx ON berkshire_docs(year);
CREATE INDEX IF NOT EXISTS berkshire_docs_period_idx ON berkshire_docs(period);
```

### 2. Ingest Data

You have two options:

**Option A: Run locally and sync to production**
```bash
# Set production DATABASE_URL temporarily
export DATABASE_URL="your-production-db-url"

# Run ingestion
node scripts/ingest.js
```

**Option B: Upload via hosting platform**
- Upload PDF files to your hosting platform
- Run ingestion script in production environment

### 3. Test Your Live App

```bash
# Test API
curl https://your-app-url.com/api

# Test in browser
https://your-app-url.com
```

## 🌐 Access Your Live App

After deployment, you'll get a URL like:
- Vercel: `https://berkshireiq.vercel.app`
- Railway: `https://berkshireiq.up.railway.app`
- Render: `https://berkshireiq.onrender.com`
- Netlify: `https://berkshireiq.netlify.app`

### Endpoints:
- **Playground:** `https://your-url.com`
- **API:** `https://your-url.com/api`
- **Workflows:** `https://your-url.com/api/workflows/rag-workflow`
- **Agents:** `https://your-url.com/api/agents/ragAgent`

## 🔒 Security Checklist

- [x] `.env` file is in `.gitignore`
- [x] `.env.example` created (no real keys)
- [x] API keys stored as environment variables
- [x] Database credentials not in code
- [ ] Set up CORS if needed
- [ ] Add rate limiting for production
- [ ] Enable HTTPS (automatic on most platforms)

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (needs >= 20.9.0)
- Verify all dependencies in package.json
- Check build logs for specific errors

### Database Connection Issues
- Verify DATABASE_URL format
- Check if pgvector extension is installed
- Ensure database allows external connections
- Check firewall/security group settings

### API Not Working
- Verify OPENAI_API_KEY is set
- Check environment variables are loaded
- Review application logs
- Test with curl or Postman

## 📱 Custom Domain (Optional)

Most platforms allow custom domains:

1. **Vercel:** Settings → Domains → Add
2. **Railway:** Settings → Networking → Custom Domain
3. **Render:** Settings → Custom Domain
4. **Netlify:** Domain Settings → Add custom domain

## 💰 Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Vercel | Yes (Hobby) | $20/mo+ |
| Railway | $5 credit/mo | Pay as you go |
| Render | Yes (limited) | $7/mo+ |
| Netlify | Yes (100GB) | $19/mo+ |
| Supabase DB | Yes (500MB) | $25/mo+ |
| Neon DB | Yes (3GB) | $19/mo+ |

## 🎯 Recommended Setup

**For Free Hosting:**
- **App:** Vercel or Railway
- **Database:** Supabase or Neon
- **Total Cost:** $0/month

**For Production:**
- **App:** Vercel Pro or Railway
- **Database:** Railway PostgreSQL or Supabase Pro
- **Total Cost:** ~$20-30/month

## 📞 Support

- Check deployment logs for errors
- Review platform documentation
- Test locally first with `npm run dev`
- Verify environment variables are set correctly

---

**Ready to deploy?** Follow the steps above and your BerkshireIQ will be live in minutes! 🚀
