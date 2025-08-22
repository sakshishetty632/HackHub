
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Shapes, Bot, Palette, Search } from "lucide-react";
import Image from "next/image";

const resourceCategories = {
  APIs: [
    {
      title: "Stripe API",
      description: "Payment processing for internet businesses.",
      icon: <Package className="w-8 h-8 text-primary" />,
      hint: "payment finance",
    },
    {
      title: "Google Maps API",
      description: "Add maps, location data, and routing to your app.",
      icon: <Package className="w-8 h-8 text-primary" />,
      hint: "map location",
    },
    {
      title: "Twilio API",
      description: "Build voice, video, and messaging applications.",
      icon: <Package className="w-8 h-8 text-primary" />,
      hint: "communication messaging",
    },
  ],
  "AI / ML": [
     {
      title: "Firebase Genkit",
      description: "Build, deploy, and monitor AI flows with ease.",
      icon: <Bot className="w-8 h-8 text-primary" />,
      hint: "AI development",
    },
    {
      title: "Hugging Face",
      description: "Access thousands of pretrained models for NLP, vision, and more.",
      icon: <Bot className="w-8 h-8 text-primary" />,
      hint: "machine learning",
    },
  ],
  "UI Kits": [
    {
      title: "shadcn/ui",
      description: "Beautifully designed components you can copy and paste.",
      icon: <Palette className="w-8 h-8 text-primary" />,
      hint: "UI design",
    },
    {
      title: "Material-UI",
      description: "React components for faster and easier web development.",
      icon: <Palette className="w-8 h-8 text-primary" />,
      hint: "web development",
    },
  ],
  "3D Assets": [
    {
      title: "Sketchfab",
      description: "Publish, share, and discover 3D content.",
      icon: <Shapes className="w-8 h-8 text-primary" />,
      hint: "3D model",
    },
  ],
};

type Resource = {
  title: string;
  description: string;
  icon: React.ReactNode;
  hint: string;
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary">
            {resource.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{resource.title}</h3>
          <p className="text-sm text-muted-foreground">{resource.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Resource Marketplace" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="relative">
            <Input placeholder="Search resources..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <Tabs defaultValue="APIs" className="w-full">
            <TabsList>
              {Object.keys(resourceCategories).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(resourceCategories).map(([category, resources]) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.title} resource={resource} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
