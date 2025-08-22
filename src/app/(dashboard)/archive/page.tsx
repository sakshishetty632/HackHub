import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const archivedProjects = [
  {
    id: "1",
    name: "EcoTracker",
    description: "An app to track and reduce personal carbon footprint.",
    date: "2023-10-22",
    tags: ["Sustainability", "Mobile App"],
    link: "#",
  },
  {
    id: "2",
    name: "HealthConnect",
    description: "Connecting patients with doctors for remote consultations.",
    date: "2023-05-15",
    tags: ["Healthcare", "Web App"],
    link: "#",
  },
  {
    id: "3",
    name: "DeFi Dashboard",
    description: "A decentralized finance portfolio tracker.",
    date: "2023-01-30",
    tags: ["Web3", "Finance"],
    link: "#",
  },
  {
    id: "4",
    name: "ArtGen",
    description: "AI-powered generator for unique digital art pieces.",
    date: "2022-11-20",
    tags: ["Generative AI", "Art"],
    link: "#",
  },
];

export default function ArchivePage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Project Archive" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Archived Projects</CardTitle>
            <CardDescription>
              A collection of past projects from various hackathons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date Archived</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archivedProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell className="text-muted-foreground">{project.description}</TableCell>
                    <TableCell>{project.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.link}>View Docs</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
