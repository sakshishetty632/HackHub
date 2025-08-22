'use server';

/**
 * @fileOverview Generates hackathon project ideas based on popular trends and technologies.
 *
 * - generateProjectIdea - A function that generates a project idea.
 * - ProjectIdeaInput - The input type for the generateProjectIdea function.
 * - ProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectIdeaInputSchema = z.object({
  trend: z.string().describe('The popular trend or technology to base the project idea on.'),
});
export type ProjectIdeaInput = z.infer<typeof ProjectIdeaInputSchema>;

const ProjectIdeaOutputSchema = z.object({
  title: z.string().describe('The title of the project idea.'),
  description: z.string().describe('A detailed description of the project idea.'),
  suggestedTechStack: z.string().describe('A suggested tech stack for the project.'),
});
export type ProjectIdeaOutput = z.infer<typeof ProjectIdeaOutputSchema>;

export async function generateProjectIdea(input: ProjectIdeaInput): Promise<ProjectIdeaOutput> {
  return projectIdeaFlow(input);
}

const projectIdeaPrompt = ai.definePrompt({
  name: 'projectIdeaPrompt',
  input: {schema: ProjectIdeaInputSchema},
  output: {schema: ProjectIdeaOutputSchema},
  prompt: `You are a creative hackathon project idea generator. Generate a project idea based on the following trend or technology:

Trend: {{{trend}}}

Project Idea Details:`,
});

const projectIdeaFlow = ai.defineFlow(
  {
    name: 'projectIdeaFlow',
    inputSchema: ProjectIdeaInputSchema,
    outputSchema: ProjectIdeaOutputSchema,
  },
  async input => {
    const {output} = await projectIdeaPrompt(input);
    return output!;
  }
);
