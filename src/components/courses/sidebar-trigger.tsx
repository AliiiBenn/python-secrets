"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function FloatingSidebarTrigger() {
  const { state } = useSidebar();

  if (state !== "collapsed") {
    return null;
  }

  return (
    <div className="fixed bottom-2 left-2 z-50 transition-all animate-in fade-in slide-in-from-left-4 duration-300">
      <SidebarTrigger className="h-9 w-9 border bg-background shadow-md hover:bg-accent" />
    </div>
  );
}
