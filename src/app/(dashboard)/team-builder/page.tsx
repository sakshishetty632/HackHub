import { Header } from "@/components/header";
import { TeamBuilderClient } from "./components/team-builder-client";

export default function TeamBuilderPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Team Auto-Assembler" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <TeamBuilderClient />
      </main>
    </div>
  );
}
