# 📤 Push BerkshireIQ to GitHub - Step by Step

## Prerequisites

- Git installed on your computer
- GitHub account created
- Project is ready (all files saved)

## Step 1: Check Git Status

```bash
# Check if git is installed
git --version

# Check current status
git status
```

## Step 2: Initialize Git (if needed)

```bash
# Initialize git repository
git init

# Check status
git status
```

## Step 3: Add All Files

```bash
# Add all files to staging
git add .

# Verify what will be committed
git status
```

## Step 4: Commit Changes

```bash
# Commit with message
git commit -m "Initial commit: BerkshireIQ AI-powered shareholder letter analyzer"

# Verify commit
git log --oneline
```

## Step 5: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to [github.com](https://github.com)
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `BerkshireIQ`
4. Description: `AI-powered platform for analyzing Warren Buffett's shareholder letters`
5. Choose: **Public** (for free hosting) or **Private**
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click "Create repository"

### Option B: Via GitHub CLI (if installed)
```bash
gh repo create BerkshireIQ --public --source=. --remote=origin
```

## Step 6: Connect to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/BerkshireIQ.git

# Verify remote
git remote -v
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 7: Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### If you get authentication error:

**Option A: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (all)
4. Copy the token
5. When pushing, use token as password

**Option B: Use SSH**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Then change remote URL:
git remote set-url origin git@github.com:YOUR_USERNAME/BerkshireIQ.git
```

## Step 8: Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/BerkshireIQ`
2. You should see all your files
3. Check that `.env` is NOT visible (it should be ignored)

## Step 9: Update README (Optional)

Replace the main README with the GitHub version:

```bash
# Backup current README
mv README.md README_ORIGINAL.md

# Use GitHub README
mv README_GITHUB.md README.md

# Commit and push
git add .
git commit -m "Update README for GitHub"
git push origin main
```

## 🎉 Success! Your Code is on GitHub

Your repository is now live at:
```
https://github.com/YOUR_USERNAME/BerkshireIQ
```

## Next Steps: Deploy Live

### Option 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `BerkshireIQ` repository
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI key
   - `DATABASE_URL`: Your database URL (see below)
6. Click "Deploy"
7. Get your live URL: `https://berkshireiq.vercel.app`

### Option 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `BerkshireIQ`
5. Add PostgreSQL:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-creates `DATABASE_URL`
6. Add environment variable:
   - `OPENAI_API_KEY`: Your OpenAI key
7. Deploy
8. Get your live URL: `https://berkshireiq.up.railway.app`

### Option 3: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect `BerkshireIQ` repository
5. Configure:
   - Build: `npm install && npm run build`
   - Start: `npm start`
6. Add environment variables
7. Deploy
8. Get your live URL: `https://berkshireiq.onrender.com`

## 🗄️ Database Setup for Live Deployment

### Supabase (Free - Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (URI mode)
5. In SQL Editor, run:
   ```sql
   CREATE EXTENSION vector;
   ```
6. Run the SQL from `scripts/init-db.sql`
7. Use this URL as `DATABASE_URL` in your hosting platform

### Neon (Serverless)

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. In SQL Editor, run:
   ```sql
   CREATE EXTENSION vector;
   ```
5. Run the SQL from `scripts/init-db.sql`
6. Use this URL as `DATABASE_URL`

## 📊 After Deployment

### 1. Test Your Live App

```bash
# Test API
curl https://your-app-url.com/api

# Visit in browser
https://your-app-url.com
```

### 2. Ingest Data to Production Database

```bash
# Set production database URL
export DATABASE_URL="your-production-database-url"

# Run ingestion
node scripts/ingest.js
```

### 3. Share Your Live App

Your app is now live! Share the URL:
- `https://your-app-url.com` - Main playground
- `https://your-app-url.com/api` - API endpoint

## 🔄 Future Updates

When you make changes:

```bash
# Make your changes
# ...

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Most hosting platforms will auto-deploy when you push to GitHub!

## 🐛 Troubleshooting

### "Permission denied" when pushing
- Use personal access token or SSH key (see Step 7)

### ".env file is visible on GitHub"
- Check `.gitignore` includes `.env`
- Remove from git: `git rm --cached .env`
- Commit and push again

### "Build failed" on hosting platform
- Check Node.js version (needs >= 20.9.0)
- Verify environment variables are set
- Check build logs for specific errors

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check pgvector extension is installed
- Ensure database allows external connections

## 📞 Need Help?

- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions
- Review hosting platform documentation
- Check GitHub repository settings

---

**Congratulations! Your BerkshireIQ project is now on GitHub and ready to deploy! 🎉**
