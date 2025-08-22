"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createProjectIdea, type FormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lightbulb, Package, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Idea"
      )}
    </Button>
  );
}

export function IdeaGeneratorClient() {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(createProjectIdea, initialState);
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
    <div className="mx-auto max-w-2xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Stuck for an idea?</CardTitle>
          <CardDescription>
            Enter a popular trend or technology, and our AI will generate a unique hackathon project idea for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trend">Trend or Technology</Label>
              <Input id="trend" name="trend" placeholder="e.g., Generative AI, Web3, Sustainable Tech" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.data ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary"/>
                {state.data.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2"><Package className="h-5 w-5"/>Description</h3>
              <p className="text-sm text-muted-foreground">
                {state.data.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2"><Cpu className="h-5 w-5"/>Suggested Tech Stack</h3>
              <p className="text-sm text-muted-foreground">
                {state.data.suggestedTechStack}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex items-center justify-center border-dashed min-h-[300px]">
          <div className="text-center p-6">
            <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Your Next Big Idea Awaits</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter a topic and let our AI spark your imagination.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
