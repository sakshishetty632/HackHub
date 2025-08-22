import { Header } from "@/components/header";
import { ProjectBoard } from "./components/project-board";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Project Management" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <ProjectBoard />
      </main>
    </div>
  );
}
