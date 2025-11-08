# 🚀 BerkshireIQ - Live Deployment Ready

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

A sophisticated AI-powered platform for analyzing and querying Warren Buffett's Berkshire Hathaway shareholder letters using advanced RAG (Retrieval-Augmented Generation) technology.

## ✨ Live Demo

🌐 **[Try it Live](#)** (Add your deployed URL here)

## 🎯 Features

- **47+ Years of Wisdom**: All Berkshire Hathaway shareholder letters (1977-2024)
- **AI-Powered Search**: Semantic search using OpenAI embeddings
- **Contextual Responses**: Get answers with source citations
- **Historical Analysis**: Filter by year or time period
- **Modern Stack**: Built with Mastra framework and pgvector

## 🚀 Quick Deploy

### Deploy to Vercel (1-Click)
1. Click the "Deploy with Vercel" button above
2. Add your `OPENAI_API_KEY` and `DATABASE_URL`
3. Deploy!

### Deploy to Railway (Includes Database)
1. Click the "Deploy on Railway" button above
2. Add PostgreSQL service
3. Set `OPENAI_API_KEY`
4. Deploy!

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📦 Local Development

### Prerequisites
- Node.js >= 20.9.0
- PostgreSQL with pgvector (or use cloud database)
- OpenAI API key

### Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/BerkshireIQ.git
cd BerkshireIQ

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
# OPENAI_API_KEY=your_key_here
# DATABASE_URL=your_database_url

# Run development server
npm run dev
```

Visit: http://localhost:4111

## 🗄️ Database Setup

### Option 1: Cloud Database (Recommended for Production)

**Supabase (Free):**
1. Create project at [supabase.com](https://supabase.com)
2. Get connection string
3. Run SQL from `scripts/init-db.sql`

**Neon (Serverless):**
1. Create project at [neon.tech](https://neon.tech)
2. Get connection string
3. Enable pgvector extension

### Option 2: Local PostgreSQL

```bash
# Install PostgreSQL with pgvector
# Then run:
psql -U postgres -c "CREATE DATABASE \"421302\";"
psql -U postgres -d 421302 -c "CREATE EXTENSION vector;"
psql -U postgres -d 421302 -f scripts/init-db.sql
```

## 📊 Data Ingestion

```bash
# Ingest shareholder letters
node scripts/ingest.js
```

This processes all PDF files in `data/letters/raw/` and creates vector embeddings.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run status` | Show project status |
| `npm run check-db` | Check database connection |
| `npm run test-config` | Validate configuration |

## 🌐 API Endpoints

Once deployed, your API will be available at:

- **Playground:** `https://your-url.com`
- **API Base:** `https://your-url.com/api`
- **RAG Workflow:** `https://your-url.com/api/workflows/rag-workflow`
- **Buffett Agent:** `https://your-url.com/api/agents/ragAgent`

### Example API Request

```bash
curl -X POST https://your-url.com/api/workflows/rag-workflow \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are Buffett'\''s key investment principles?",
    "year": "2023"
  }'
```

## 🏗️ Architecture

```
BerkshireIQ/
├── src/
│   ├── config/          # Configuration management
│   └── mastra/          # AI workflows and agents
│       ├── agents/      # RAG agent
│       ├── tools/       # Document search tools
│       └── workflows/   # RAG workflow
├── data/letters/raw/    # PDF source files
├── scripts/             # Setup and ingestion scripts
└── .github/workflows/   # CI/CD automation
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
OPENAI_API_KEY=sk-proj-your-key-here
DATABASE_URL=postgresql://user:password@host:5432/database
LOG_LEVEL=info
```

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment instructions
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Local setup guide
- [NEXT_STEPS.md](NEXT_STEPS.md) - Quick start guide
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current project status

## 🔒 Security

- API keys stored as environment variables
- `.env` file excluded from git
- Database credentials not in code
- HTTPS enabled on all hosting platforms

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC License

## 🙏 Acknowledgments

- Warren Buffett and Berkshire Hathaway for the shareholder letters
- OpenAI for AI capabilities
- Mastra framework for AI workflow engine

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/BerkshireIQ/issues)
- **Discussions:** [GitHub Discussions](https://github.com/YOUR_USERNAME/BerkshireIQ/discussions)

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Made with ❤️ for the investment community**
