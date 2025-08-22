"use client";

import { useState } from "react";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
};

type Column = "To Do" | "In Progress" | "Done";

const initialData = {
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

function KanbanCard({ task, column, onDelete }: { task: Task, column: Column, onDelete: (id: string, column: Column) => void }) {
  return (
    <Card
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("sourceColumn", column);
      }}
      className="bg-card p-4 rounded-lg shadow-sm group"
    >
      <CardContent className="p-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
           <p className="text-sm font-medium">{task.title}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
          onClick={() => onDelete(task.id, column)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function AddTaskDialog({ column, onAddTask }: { column: Column, onAddTask: (title: string, column: Column) => void }) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title.trim(), column);
      setTitle("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task to {column}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task-title" className="text-right">
              Title
            </Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter task title"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function KanbanColumn({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onDrop,
}: {
  title: Column;
  tasks: Task[];
  onAddTask: (title: string, column: Column) => void;
  onDeleteTask: (id: string, column: Column) => void;
  onDrop: (column: Column) => void;
}) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={() => onDrop(title)}
      onDragOver={handleDragOver}
      className="flex flex-col gap-4 bg-muted/50 p-4 rounded-lg"
    >
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <div className="flex flex-col gap-4 min-h-[200px]">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} column={title} onDelete={onDeleteTask} />
        ))}
      </div>
       <AddTaskDialog column={title} onAddTask={onAddTask} />
    </div>
  );
}

export function ProjectBoard() {
  const [projectsData, setProjectsData] = useState(initialData);

  const handleAddTask = (title: string, column: Column) => {
    const newTask = { id: `task-${Date.now()}`, title };
    setProjectsData((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask],
    }));
  };

  const handleDeleteTask = (id: string, column: Column) => {
    setProjectsData((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: Column
  ) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn") as Column;

    if (taskId && sourceColumn && sourceColumn !== targetColumn) {
      let taskToMove: Task | undefined;
      const newSourceTasks = projectsData[sourceColumn].filter((task) => {
        if (task.id === taskId) {
          taskToMove = task;
          return false;
        }
        return true;
      });

      if (taskToMove) {
        const newTargetTasks = [...projectsData[targetColumn], taskToMove];
        setProjectsData({
          ...projectsData,
          [sourceColumn]: newSourceTasks,
          [targetColumn]: newTargetTasks,
        });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {Object.entries(projectsData).map(([title, tasks]) => (
        <div
          key={title}
          onDrop={(e) => handleDrop(e, title as Column)}
          onDragOver={(e) => e.preventDefault()}
        >
          <KanbanColumn
            title={title as Column}
            tasks={tasks}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onDrop={() => {}} // Dummy onDrop for the column itself
          />
        </div>
      ))}
    </div>
  );
}
