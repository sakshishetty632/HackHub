"use server";

import { generateBlogPost, BlogPostInput, BlogPostOutput } from '@/ai/flows/blog-post-generator';
import { z } from 'zod';

const schema = z.object({
  topic: z.string().min(3, 'Please enter a topic.'),
});

export type FormState = {
  message: string;
  data?: BlogPostOutput;
  issues?: string[];
} | null;

export async function createBlogPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      issues: validatedFields.error.issues.map((issue) => issue.path.join('.') + ': ' + issue.message),
    };
  }

  try {
    const result = await generateBlogPost(validatedFields.data as BlogPostInput);
    return { message: 'success', data: result };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: `An error occurred: ${errorMessage}` };
  }
}
