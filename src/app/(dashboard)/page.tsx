import Link from "next/link";
import {
  Archive,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  PackageSearch,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import Image from "next/image";

const tools = [
  {
    title: "Team Auto-Assembler",
    description: "AI-powered team building based on skills and interests.",
    href: "/team-builder",
    icon: <Users className="h-8 w-8 text-primary" />,
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "collaboration teamwork"
    }
  },
  {
    title: "Project Idea Generator",
    description: "Spark creativity with AI-generated hackathon ideas.",
    href: "/idea-generator",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "innovation lightbulb"
    }
  },
  {
    title: "Project Management Boards",
    description: "Kanban-style boards to track your hackathon progress.",
    href: "/projects",
    icon: <FolderKanban className="h-8 w-8 text-primary" />,
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "project management"
    }
  },
  {
    title: "Resource Marketplace",
    description: "Discover APIs, libraries, and tools for your project.",
    href: "/resources",
    icon: <PackageSearch className="h-8 w-8 text-primary" />,
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "code library"
    }
  },
  {
    title: "Post-Hackathon Archiving",
    description: "Archive and document your projects after the event.",
    href: "/archive",
    icon: <Archive className="h-8 w-8 text-primary" />,
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "data archive"
    }
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="group">
              <Card className="h-full overflow-hidden transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="relative h-40 w-full">
                  <Image src={tool.image.src} alt={tool.title} fill className="object-cover" data-ai-hint={tool.image.hint} />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {tool.icon}
                    <div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
