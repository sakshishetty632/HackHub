'use server';

/**
 * @fileOverview Generates a blog post based on a given topic.
 *
 * - generateBlogPost - A function that generates a blog post.
 * - BlogPostInput - The input type for the generateBlogPost function.
 * - BlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
});
export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;

const BlogPostOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The content of the blog post in markdown format.'),
});
export type BlogPostOutput = z.infer<typeof BlogPostOutputSchema>;

export async function generateBlogPost(input: BlogPostInput): Promise<BlogPostOutput> {
  return blogPostFlow(input);
}

const blogPostPrompt = ai.definePrompt({
  name: 'blogPostPrompt',
  input: {schema: BlogPostInputSchema},
  output: {schema: BlogPostOutputSchema},
  prompt: `You are an expert blog post writer. Generate a comprehensive and engaging blog post based on the following topic. The content should be in markdown format.

Topic: {{{topic}}}

Blog Post Details:`,
});

const blogPostFlow = ai.defineFlow(
  {
    name: 'blogPostFlow',
    inputSchema: BlogPostInputSchema,
    outputSchema: BlogPostOutputSchema,
  },
  async input => {
    const {output} = await blogPostPrompt(input);
    return output!;
  }
);
