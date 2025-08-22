"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createBlogPost, type FormState } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Feather, FileText } from "lucide-react";
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
        "Generate Blog Post"
      )}
    </Button>
  );
}

export function BlogGeneratorClient() {
  const initialState: FormState = null;
  const [state, formAction] = useActionState(createBlogPost, initialState);
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
    <div className="mx-auto max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Blog Post Generator</CardTitle>
          <CardDescription>
            Enter a topic, and our AI will write a blog post for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Blog Post Topic</Label>
              <Input id="topic" name="topic" placeholder="e.g., The Future of Artificial Intelligence" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.data ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Feather className="h-6 w-6 text-primary"/>
                {state.data.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm">{state.data.content}</pre>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex items-center justify-center border-dashed min-h-[400px]">
          <div className="text-center p-6">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Your Blog Post Awaits</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter a topic and let our AI craft a post for you.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
