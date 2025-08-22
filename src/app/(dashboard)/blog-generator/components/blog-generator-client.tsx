"use client";

import { useActionState, useEffect, useState } from "react";
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

const initialBlog = {
    title: "Introducing HackHub: Your All-in-One Hackathon Companion",
    content: `
Hackathons are a whirlwind of innovation, collaboration, and caffeine-fueled creativity. But let's face it, they can also be chaotic. From finding the right team to brainstorming a winning idea and managing your project under pressure, the challenges are real. That's where HackHub comes in.

HackHub is a comprehensive toolkit designed to streamline your hackathon experience from start to finish. It's your central hub for ideas, team formation, project management, and more, all powered by cutting-edge AI.

## Key Features of HackHub

### 1. Team Auto-Assembler
Struggling to find teammates with the right skills? Our AI-powered Team Auto-Assembler takes the guesswork out of team formation. Simply input your skills, interests, and availability, and the AI will suggest potential team members and roles, ensuring you build a balanced and effective team.

### 2. Project Idea Generator
Writer's block, but for hackathon ideas? We've got you covered. The Project Idea Generator uses AI to spark creativity. Just enter a trend or technology (like "Generative AI" or "Web3"), and it will generate unique and inspiring project ideas complete with a description and suggested tech stack.

### 3. Project Management Boards
Keep your project on track with our intuitive Kanban-style boards. You can create tasks, assign them to team members, and move them through "To Do," "In Progress," and "Done" columns. With real-time database integration, your entire team stays in sync.

### 4. Resource Marketplace
Don't waste precious time searching for the right tools. Our curated Resource Marketplace provides a one-stop shop for the best APIs, UI kits, AI/ML models, and 3D assets. Each resource links directly to its documentation, so you can get started right away.

### 5. Post-Hackathon Archiving
Your work doesn't end when the hackathon does. The Archive feature allows you to document and store your past projects, creating a portfolio of your accomplishments that you can easily share and reference in the future.

### 6. AI Blog Post Generator
Need to create a dev diary or a final presentation? The Blog Generator can instantly create a well-written article on any topic, helping you communicate your project's story effectively.

HackHub is more than just a set of tools; it's your partner in innovation. By handling the logistics, we empower you to focus on what you do best: building amazing things.
    `
};

export function BlogGeneratorClient() {
  const initialState: FormState = { message: 'success', data: initialBlog };
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
