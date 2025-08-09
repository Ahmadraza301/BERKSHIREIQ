# BerkshireIQ

A sophisticated AI-powered platform for analyzing and querying Warren Buffett's Berkshire Hathaway shareholder letters using advanced RAG (Retrieval-Augmented Generation) technology.

## 🎯 Overview

BerkshireIQ transforms decades of Warren Buffett's wisdom into an intelligent, searchable knowledge base. The platform uses vector embeddings and semantic search to provide instant access to insights from Berkshire Hathaway's annual shareholder letters spanning from 1977 to 2024.

## ✨ Features

- **Comprehensive Coverage**: All Berkshire Hathaway shareholder letters from 1977-2024
- **Intelligent Search**: Semantic search across 47+ years of financial wisdom
- **Contextual Responses**: AI-powered answers with source citations
- **Historical Analysis**: Search by specific years or historical periods
- **Topic Filtering**: Focus on specific investment themes or topics
- **Vector Database**: High-performance semantic search using pgvector
- **Modern Architecture**: Built with Mastra framework for scalable AI workflows

## 🏗️ Architecture

```
BerkshireIQ/
├── data/letters/raw/          # PDF source files (1977-2024)
├── src/
│   ├── config/               # Configuration management
│   └── mastra/              # AI workflow engine
│       ├── agents/          # AI agents for different tasks
│       ├── tools/           # Custom tools for document search
│       └── workflows/       # RAG workflow orchestration
├── scripts/                 # Utility scripts for setup and ingestion
└── package.json            # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.9.0
- PostgreSQL with pgvector extension
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ahmadraza301/BERKSHIREIQ.git
   cd BerkshireIQ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   npm run setup
   ```

4. **Configure your environment variables**
   ```bash
   # Edit .env file with your credentials
   OPENAI_API_KEY=your_openai_api_key_here
   DATABASE_URL=postgresql://postgres:password@localhost:5432/berkshireiq
   LOG_LEVEL=info
   ```

5. **Ingest the shareholder letters**
   ```bash
   node scripts/ingest.js
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 📚 Data Processing

The platform processes Berkshire Hathaway shareholder letters through a sophisticated pipeline:

### Document Processing
- **PDF Parsing**: Extracts text while preserving document structure
- **Intelligent Chunking**: 1200-character chunks with 300-character overlap
- **Metadata Enrichment**: Year, historical period, source classification
- **Vector Embeddings**: OpenAI text-embedding-3-small for semantic search

### Historical Periods
- **Early Buffett Era (1965-1984)**: Foundation and early investment principles
- **Capital Allocation Era (1985-1999)**: Growth and diversification strategies
- **Mature Berkshire Era (2000-2009)**: Scale and complexity management
- **Modern Berkshire Era (2010-Present)**: Contemporary challenges and insights

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `DATABASE_URL` | PostgreSQL connection string with pgvector | Yes |
| `LOG_LEVEL` | Logging level (info/debug/warn/error) | No |

### Database Setup

Ensure your PostgreSQL instance has the pgvector extension installed:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## 🛠️ Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Setup | `npm run setup` | Initialize environment and validate configuration |
| Test Config | `npm run test-config` | Validate configuration settings |
| Test OpenAI | `npm run test-openai` | Test OpenAI API connectivity |
| Ingest Data | `node scripts/ingest.js` | Process and index shareholder letters |
| Development | `npm run dev` | Start development server |
| Build | `npm run build` | Build for production |
| Start | `npm run start` | Start production server |

## 🤖 AI Workflows

### RAG Workflow
The core workflow enables intelligent querying of Berkshire letters:

- **Input**: Natural language queries with optional year/topic filters
- **Processing**: Semantic search across vector database
- **Output**: Contextual answers with source citations

### Document Search Tool
Custom tool for vector-based document retrieval:

- **Embedding**: OpenAI text-embedding-3-small
- **Search**: pgvector similarity search
- **Filtering**: Year and topic-based filtering
- **Ranking**: Relevance scoring and ranking

## 📊 Data Statistics

- **47+ Years**: Complete coverage from 1977-2024
- **48 Letters**: All available shareholder letters
- **Optimized Chunks**: Intelligent document segmentation
- **Vector Database**: High-performance semantic search
- **Metadata Rich**: Year, period, source, and chunk information

## 🔍 Usage Examples

### Basic Query
```javascript
// Search for investment principles
const result = await mastra.workflows.ragWorkflow({
  query: "What are Buffett's key investment principles?",
});
```

### Year-Specific Search
```javascript
// Focus on specific year
const result = await mastra.workflows.ragWorkflow({
  query: "How did Buffett handle the 2008 financial crisis?",
  year: "2008"
});
```

### Topic-Filtered Search
```javascript
// Search specific topics
const result = await mastra.workflows.ragWorkflow({
  query: "What does Buffett say about market timing?",
  topic: "market timing"
});
```

## 🛡️ Security

- Environment variables for sensitive configuration
- No hardcoded API keys or credentials
- Secure database connections
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Warren Buffett and Berkshire Hathaway for the invaluable shareholder letters
- OpenAI for providing the AI capabilities
- The Mastra framework team for the excellent AI workflow engine
- The open-source community for the various tools and libraries used

## 📞 Support

For questions, issues, or contributions, please open an issue on the repository or contact the development team.

---

**BerkshireIQ** - Making Warren Buffett's wisdom accessible through AI
