"use server";

import { teamAutoAssembler, TeamAutoAssemblerInput, TeamAutoAssemblerOutput } from '@/ai/flows/team-auto-assembler';
import { z } from 'zod';

const schema = z.object({
    skills: z.string().min(1, 'Please enter at least one skill.'),
    interests: z.string().min(1, 'Please enter at least one interest.'),
    availability: z.string().min(1, 'Please describe your availability.'),
    projectNeeds: z.string().optional(),
});

export type FormState = {
    message: string;
    data?: TeamAutoAssemblerOutput;
    issues?: string[];
} | null;

export async function assembleTeam(
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
        const result = await teamAutoAssembler(validatedFields.data as TeamAutoAssemblerInput);
        return { message: 'success', data: result };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return { message: `An error occurred: ${errorMessage}` };
    }
}
