import { Header } from "@/components/header";
import { IdeaGeneratorClient } from "./components/idea-generator-client";

export default function IdeaGeneratorPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Project Idea Generator" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <IdeaGeneratorClient />
      </main>
    </div>
  );
}
