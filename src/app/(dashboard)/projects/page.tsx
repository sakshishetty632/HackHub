import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projectsData = {
  "To Do": [
    { id: "task-1", title: "Set up project repository on GitHub" },
    { id: "task-2", title: "Define MVP features and user stories" },
    { id: "task-3", title: "Create initial UI/UX mockups in Figma" },
    { id: "task-8", title: "Choose a database solution" },
  ],
  "In Progress": [
    { id: "task-4", title: "Develop user authentication flow" },
    { id: "task-5", title: "Implement main dashboard layout and components" },
  ],
  "Done": [
    { id: "task-6", title: "Decide on core tech stack (Next.js, Tailwind)" },
    { id: "task-7", title: "Project kickoff and role assignment" },
  ],
};

type Task = {
  id: string;
  title: string;
};

type Column = keyof typeof projectsData;

function KanbanColumn({ title, tasks }: { title: string; tasks: Task[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-card">
            <CardContent className="p-4">
              <p className="text-sm font-medium">{task.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Project Management" />
      <main className="flex-1 overflow-x-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {Object.entries(projectsData).map(([title, tasks]) => (
            <KanbanColumn key={title} title={title} tasks={tasks} />
          ))}
        </div>
      </main>
    </div>
  );
}
