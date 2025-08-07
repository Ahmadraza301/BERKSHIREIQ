import { createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { documentSearchTool } from '../tools/document-search-tool';

const ragWorkflow = createWorkflow({
  id: 'rag-workflow',
  inputSchema: z.object({
    query: z.string(),
    year: z.string().optional(),
    topic: z.string().optional(),
  }),
  outputSchema: z.object({
    answer: z.string(),
    sources: z.array(z.object({
      year: z.string(),
      source: z.string(),
      text: z.string(),
    })),
  }),
})
  .then(async ({ inputData, tools }) => {
    const results = await tools.documentSearchTool({
      query: inputData.query,
      year: inputData.year,
      topic: inputData.topic,
    });
    // Compose answer with citations
    const answer = results.map(r => `"${r.text}" (${r.year} Letter)`).join('\n\n');
    return {
      answer,
      sources: results.map(r => ({ year: r.year, source: r.source, text: r.text })),
    };
  });

export { ragWorkflow };
