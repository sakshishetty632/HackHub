"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  PackageSearch,
  Settings,
  Users,
  CodeXml,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const menuItems = [
  { href: "/", title: "Dashboard", icon: LayoutDashboard },
  { href: "/team-builder", title: "Team Assembler", icon: Users },
  { href: "/idea-generator", title: "Idea Generator", icon: Lightbulb },
  { href: "/projects", title: "Projects", icon: FolderKanban },
  { href: "/resources", title: "Resources", icon: PackageSearch },
  { href: "/archive", title: "Archive", icon: Archive },
];

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <CodeXml className="w-8 h-8 text-primary" />
          <h2 className="text-xl font-semibold">HackHub</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/40x40.png" alt="@hackerman" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium">User</div>
            <div className="text-muted-foreground">hacker@email.com</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
