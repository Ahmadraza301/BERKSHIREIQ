import { createTool } from '@mastra/core/tools';
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { LibSQLStore } from '@mastra/libsql';
import { z } from 'zod';

export const documentSearchTool = createTool({
  id: 'document-search',
  description: 'Searches shareholder letters by vector similarity and metadata.',
  inputSchema: z.object({
    query: z.string(),
    year: z.string().optional(),
    topic: z.string().optional(),
  }),
  outputSchema: z.array(z.object({
    text: z.string(),
    year: z.string(),
    source: z.string(),
    score: z.number(),
  })),
  execute: async ({ context }) => {
    const { embedding } = await embed({
      model: openai.textEmbeddingModel('text-embedding-3-small'),
      value: context.query,
    });
    // TODO: Implement vector search using pgvector or supported vector DB
    // Placeholder: return empty array
    return [];
  },
});
