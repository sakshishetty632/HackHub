import { Header } from "@/components/header";
import { BlogGeneratorClient } from "./components/blog-generator-client";

export default function BlogGeneratorPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Blog Post Generator" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <BlogGeneratorClient />
      </main>
    </div>
  );
}
