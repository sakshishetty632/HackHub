'use server';

/**
 * @fileOverview A hackathon team auto-assembler AI agent.
 *
 * - teamAutoAssembler - A function that handles the team assembly process.
 * - TeamAutoAssemblerInput - The input type for the teamAutoAssembler function.
 * - TeamAutoAssemblerOutput - The return type for the teamAutoAssembler function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TeamAutoAssemblerInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of skills the user possesses.'),
  interests: z
    .string()
    .describe('A comma-separated list of the user\'s interests.'),
  availability: z
    .string()
    .describe('The user\'s availability during the hackathon.'),
  projectNeeds: z
    .string()
    .optional()
    .describe('Optional: A description of the project needs and any missing roles.'),
});
export type TeamAutoAssemblerInput = z.infer<typeof TeamAutoAssemblerInputSchema>;

const TeamAutoAssemblerOutputSchema = z.object({
  teamMembers: z
    .array(z.string())
    .describe('A list of potential team members with their skills and interests.'),
  suggestedRoles: z
    .array(z.string())
    .describe('A list of roles that are suggested to be added to the team.'),
  skillGapAnalysis: z
    .string()
    .describe('An analysis of the skill gaps within the team and how to address them.'),
});
export type TeamAutoAssemblerOutput = z.infer<typeof TeamAutoAssemblerOutputSchema>;

export async function teamAutoAssembler(input: TeamAutoAssemblerInput): Promise<TeamAutoAssemblerOutput> {
  return teamAutoAssemblerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'teamAutoAssemblerPrompt',
  input: {schema: TeamAutoAssemblerInputSchema},
  output: {schema: TeamAutoAssemblerOutputSchema},
  prompt: `You are an AI assistant that forms hackathon teams based on user skills, interests, and availability.

  A user has the following skills: {{{skills}}}
  The user is interested in: {{{interests}}}
  The user is available: {{{availability}}}
  The project needs are: {{{projectNeeds}}}

  Based on this information, suggest a list of potential team members with their skills and interests. Also, suggest a list of roles that are suggested to be added to the team, and provide a skill gap analysis.

  Format your response as a JSON object with the following keys:
  - teamMembers: A list of potential team members with their skills and interests.
  - suggestedRoles: A list of roles that are suggested to be added to the team.
  - skillGapAnalysis: An analysis of the skill gaps within the team and how to address them.
  `,
});

const teamAutoAssemblerFlow = ai.defineFlow(
  {
    name: 'teamAutoAssemblerFlow',
    inputSchema: TeamAutoAssemblerInputSchema,
    outputSchema: TeamAutoAssemblerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
