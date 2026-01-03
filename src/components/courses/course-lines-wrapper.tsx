"use client";

import { useSidebar } from "@/components/ui/sidebar";

export function CourseLines({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();

  if (state !== "collapsed") {
    return children;
  }

  return (
    <div className="max-w-4xl mx-auto border-x">
      {children}
    </div>
  );
}
