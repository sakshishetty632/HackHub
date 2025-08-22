"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const { isMobile } = useSidebar();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      {isMobile && <SidebarTrigger />}
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
    </header>
  );
}
