'use server';

/**
 * @fileOverview Suggests missing roles for a hackathon team based on their skills and project needs.
 *
 * - suggestMissingRoles - A function that analyzes team skills and suggests missing roles.
 * - SuggestMissingRolesInput - The input type for the suggestMissingRoles function.
 * - SuggestMissingRolesOutput - The return type for the suggestMissingRoles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMissingRolesInputSchema = z.object({
  teamSkills: z
    .string()
    .describe('A comma-separated list of skills that the team possesses.'),
  projectNeeds: z
    .string()
    .describe('A description of the project and the skills required.'),
});
export type SuggestMissingRolesInput = z.infer<typeof SuggestMissingRolesInputSchema>;

const SuggestMissingRolesOutputSchema = z.object({
  missingRoles: z
    .string()
    .describe(
      'A comma-separated list of roles that are missing from the team, based on the project needs and existing team skills.'
    ),
  skillGapAnalysis: z
    .string()
    .describe(
      'An analysis of the skill gaps between the team and the project needs.'
    ),
});
export type SuggestMissingRolesOutput = z.infer<typeof SuggestMissingRolesOutputSchema>;

export async function suggestMissingRoles(
  input: SuggestMissingRolesInput
): Promise<SuggestMissingRolesOutput> {
  return suggestMissingRolesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMissingRolesPrompt',
  input: {schema: SuggestMissingRolesInputSchema},
  output: {schema: SuggestMissingRolesOutputSchema},
  prompt: `You are a hackathon team advisor. You will analyze the team's skills and the project's needs and suggest roles that are missing from the team.

Team Skills: {{{teamSkills}}}
Project Needs: {{{projectNeeds}}}

Based on the team skills and the project needs, suggest roles that are missing from the team, and provide a skill gap analysis.

Missing Roles: {{missingRoles}}
Skill Gap Analysis: {{skillGapAnalysis}}`,
});

const suggestMissingRolesFlow = ai.defineFlow(
  {
    name: 'suggestMissingRolesFlow',
    inputSchema: SuggestMissingRolesInputSchema,
    outputSchema: SuggestMissingRolesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

