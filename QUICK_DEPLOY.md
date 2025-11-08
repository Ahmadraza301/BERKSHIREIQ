# ⚡ Quick Deploy - BerkshireIQ

## 🎯 Your GitHub Repository
**https://github.com/Ahmadraza301/BERKSHIREIQ**

---

## 🚀 Deploy in 3 Steps

### Step 1: Choose Platform & Deploy

#### Option A: Vercel (Recommended)
```
1. Go to: vercel.com
2. Click: "Import Project"
3. Paste: https://github.com/Ahmadraza301/BERKSHIREIQ
4. Click: "Deploy"
```

#### Option B: Railway (With Database)
```
1. Go to: railway.app
2. Click: "New Project" → "Deploy from GitHub"
3. Select: Ahmadraza301/BERKSHIREIQ
4. Add: PostgreSQL database
5. Click: "Deploy"
```

#### Option C: Render (Free)
```
1. Go to: render.com
2. Click: "New +" → "Web Service"
3. Connect: GitHub repository
4. Click: "Create Web Service"
```

---

### Step 2: Add Environment Variables

In your hosting platform, add these:

```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
DATABASE_URL=postgresql://user:password@host:5432/database
LOG_LEVEL=info
```

**Get DATABASE_URL from:**
- Supabase: [supabase.com](https://supabase.com) (Free)
- Neon: [neon.tech](https://neon.tech) (Free)
- Railway: Auto-created if using Railway

---

### Step 3: Setup Database

#### If using Supabase:
```sql
-- In Supabase SQL Editor:
CREATE EXTENSION vector;
```

Then run the SQL from `scripts/init-db.sql`

#### If using Neon:
```sql
-- In Neon SQL Editor:
CREATE EXTENSION vector;
```

Then run the SQL from `scripts/init-db.sql`

#### If using Railway:
```bash
railway run psql $DATABASE_URL -c "CREATE EXTENSION vector;"
```

Then run the SQL from `scripts/init-db.sql`

---

## 🎉 You're Live!

Your app will be available at:
- Vercel: `https://berkshireiq.vercel.app`
- Railway: `https://berkshireiq.up.railway.app`
- Render: `https://berkshireiq.onrender.com`

---

## 📊 Ingest Data (Optional)

To load shareholder letters:

```bash
# Set production database URL
set DATABASE_URL=your-production-database-url

# Run ingestion
node scripts/ingest.js
```

---

## 🧪 Test Your Live App

```bash
# Test API
curl https://your-url.com/api

# Or visit in browser
https://your-url.com
```

---

## 📚 Need More Help?

- **Complete Guide:** LIVE_DEPLOYMENT_SUMMARY.md
- **Detailed Steps:** DEPLOYMENT_GUIDE.md
- **GitHub Help:** GITHUB_PUSH_GUIDE.md

---

## ⏱️ Total Time: 15-20 minutes

1. Deploy (5 min)
2. Setup Database (3 min)
3. Ingest Data (5-10 min)
4. Test (1 min)

**Done! Your AI-powered Berkshire letter analyzer is live! 🎊**
