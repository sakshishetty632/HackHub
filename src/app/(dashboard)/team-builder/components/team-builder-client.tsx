"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { assembleTeam, type FormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Users, Lightbulb, ClipboardCheck, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Assembling...
        </>
      ) : (
        "Assemble Team"
      )}
    </Button>
  );
}

export function TeamBuilderClient() {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(assembleTeam, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.message !== 'success') {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Find Your Dream Team</CardTitle>
          <CardDescription>
            Tell us about your skills and interests, and our AI will help you find the perfect match for your hackathon project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills</Label>
              <Input id="skills" name="skills" placeholder="e.g., React, Python, UI/UX Design" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Input id="interests" name="interests" placeholder="e.g., AI, Healthcare, Sustainability" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Your Availability</Label>
              <Input id="availability" name="availability" placeholder="e.g., Full-time, Weekends, 10 hours/week" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectNeeds">Project Needs (Optional)</Label>
              <Textarea
                id="projectNeeds"
                name="projectNeeds"
                placeholder="Describe your project and what kind of roles you are looking for."
                className="min-h-[100px]"
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {state?.data ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Suggested Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {state.data.teamMembers.map((member, index) => (
                    <li key={index} className="rounded-md border p-3 text-sm">{member}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Suggested Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-2">
                  {state.data.suggestedRoles.map((role, index) => (
                    <li key={index} className="rounded-md border p-3 text-sm">{role}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  Skill Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.data.skillGapAnalysis}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex h-full items-center justify-center">
            <CardContent className="text-center p-6">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">AI-Powered Team Suggestions</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form to get personalized team and role recommendations.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
