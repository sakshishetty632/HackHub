"use client";

import { useState, useEffect, useCallback } from "react";
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
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

type Task = {
  id: string;
  title: string;
  status: Column;
  createdAt: any;
};

type Column = "To Do" | "In Progress" | "Done";

function KanbanCard({ task, column, onDelete }: { task: Task, column: Column, onDelete: (id: string, column: Column) => void }) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceColumn", column);
  };
  
  return (
    <Card
      draggable
      onDragStart={handleDragStart}
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
  isLoading,
  onAddTask,
  onDeleteTask,
  onDrop,
}: {
  title: Column;
  tasks: Task[];
  isLoading: boolean;
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
        {isLoading ? (
            <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </>
        ) : (
            tasks.map((task) => (
            <KanbanCard key={task.id} task={task} column={title} onDelete={onDeleteTask} />
            ))
        )}
      </div>
       <AddTaskDialog column={title} onAddTask={onAddTask} />
    </div>
  );
}

export function ProjectBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async (title: string, column: Column) => {
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        status: column,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDeleteTask = async (id: string) => {
     try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleDrop = useCallback(async (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: Column
  ) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn") as Column;

    if (taskId && sourceColumn !== targetColumn) {
        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, {
                status: targetColumn
            });
        } catch (error) {
            console.error("Error updating task status:", error)
        }
    }
  }, []);
  
  const getTasksByColumn = (column: Column) => {
    return tasks.filter((task) => task.status === column);
  };

  const columns: Column[] = ["To Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((column) => (
        <div
          key={column}
          onDrop={(e) => handleDrop(e, column)}
          onDragOver={(e) => e.preventDefault()}
        >
          <KanbanColumn
            title={column}
            tasks={getTasksByColumn(column)}
            isLoading={isLoading}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onDrop={() => {}} // Dummy onDrop for the column itself
          />
        </div>
      ))}
    </div>
  );
}
