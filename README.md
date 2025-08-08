# BerkshireIQ

A financial analysis tool powered by AI that provides insights from Warren Buffett's Berkshire Hathaway shareholder letters.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Run the setup script to configure your environment:

```bash
npm run setup
```

This will:
- Create a `.env` file from the template
- Validate your configuration
- Guide you through the setup process

### 3. Add Your OpenAI API Key

Edit the `.env` file and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
DATABASE_URL=postgresql://postgres:421302@localhost:5432/421302
LOG_LEVEL=info
```

**Important:** Get your OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys).

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Configuration

The application uses the following environment variables:

- `OPENAI_API_KEY` (required): Your OpenAI API key
- `DATABASE_URL` (optional): PostgreSQL connection string
- `LOG_LEVEL` (optional): Logging level (info, debug, warn, error)

## Features

- **RAG Agent**: AI-powered analysis of Berkshire Hathaway shareholder letters
- **Document Search**: Vector-based search through historical letters
- **Weather Agent**: Additional utility for weather information

## Troubleshooting

### API Key Issues

If you encounter API key errors:

1. Ensure your `.env` file exists and contains a valid OpenAI API key
2. Verify the API key starts with `sk-`
3. Check that your OpenAI account has sufficient credits
4. Run `npm run setup` to validate your configuration

### Common Errors

- **"OPENAI_API_KEY is required"**: Add your API key to the `.env` file
- **"Invalid OPENAI_API_KEY format"**: Ensure your API key starts with `sk-`
- **"Configuration validation failed"**: Check all required environment variables

## Development

The project uses:
- **Mastra**: AI workflow framework
- **OpenAI**: AI models and embeddings
- **PostgreSQL + pgvector**: Vector database for document search
- **TypeScript**: Type-safe development
