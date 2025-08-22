import { SiteSidebar } from "@/components/site-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SiteSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
