"use server";

import { generateProjectIdea, ProjectIdeaInput, ProjectIdeaOutput } from '@/ai/flows/project-idea-generator';
import { z } from 'zod';

const schema = z.object({
  trend: z.string().min(3, 'Please enter a trend or technology.'),
});

export type FormState = {
  message: string;
  data?: ProjectIdeaOutput;
  issues?: string[];
} | null;

export async function createProjectIdea(
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
    const result = await generateProjectIdea(validatedFields.data as ProjectIdeaInput);
    return { message: 'success', data: result };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: `An error occurred: ${errorMessage}` };
  }
}
