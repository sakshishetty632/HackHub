'use server';

/**
 * @fileOverview Analyzes the skill gaps for a given project description and team skills.
 *
 * - skillGapAnalysis - A function that takes a project description and a list of team skills, and returns a skill gap analysis.
 * - SkillGapAnalysisInput - The input type for the skillGapAnalysis function.
 * - SkillGapAnalysisOutput - The return type for the skillGapAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalysisInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
  teamSkills: z.array(z.string()).describe('The list of skills the team possesses.'),
});
export type SkillGapAnalysisInput = z.infer<typeof SkillGapAnalysisInputSchema>;

const SkillGapAnalysisOutputSchema = z.object({
  missingSkills: z
    .array(z.string())
    .describe('The skills missing from the team to complete the project.'),
  suggestedRoles: z
    .array(z.string())
    .describe('The roles that should be added to the team to cover the missing skills.'),
  analysis: z.string().describe('A detailed analysis of the skill gaps.'),
});
export type SkillGapAnalysisOutput = z.infer<typeof SkillGapAnalysisOutputSchema>;

export async function skillGapAnalysis(input: SkillGapAnalysisInput): Promise<SkillGapAnalysisOutput> {
  return skillGapAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapAnalysisPrompt',
  input: {schema: SkillGapAnalysisInputSchema},
  output: {schema: SkillGapAnalysisOutputSchema},
  prompt: `You are a project management expert. Given the following project description and the list of skills the team possesses, identify the skills missing from the team to complete the project, suggest roles that should be added to the team to cover the missing skills, and provide a detailed analysis of the skill gaps.

Project Description: {{{projectDescription}}}
Team Skills: {{#each teamSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Ensure the output is valid JSON.`,
});

const skillGapAnalysisFlow = ai.defineFlow(
  {
    name: 'skillGapAnalysisFlow',
    inputSchema: SkillGapAnalysisInputSchema,
    outputSchema: SkillGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
