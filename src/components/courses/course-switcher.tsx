"use client";

import * as React from "react";
import { 
  Check, 
  ChevronsUpDown, 
  Terminal, 
  Layers, 
  Cpu, 
  BookOpen 
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Données factices des cours
const COURSES = [
  {
    id: "1",
    title: "Python Fundamentals",
    level: "Beginner",
    icon: Terminal,
    color: "bg-blue-500/10 border border-blue-500/20 text-blue-500",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    level: "Intermediate",
    icon: Layers,
    color: "bg-cyan-500/10 border border-cyan-500/20 text-cyan-500",
  },
  {
    id: "3",
    title: "AI & Machine Learning",
    level: "Advanced",
    icon: Cpu,
    color: "bg-purple-500/10 border border-purple-500/20 text-purple-500",
  },
];

export function CourseSwitcher() {
  const [selectedCourse, setSelectedCourse] = React.useState(COURSES[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Icône du cours sélectionné */}
              <div className={`flex aspect-square size-8 items-center justify-center rounded-lg ${selectedCourse.color}`}>
                <selectedCourse.icon className="size-4" />
              </div>
              
              {/* Texte du cours sélectionné */}
              <div className="flex flex-col gap-0.5 leading-none text-left">
                <span className="font-semibold truncate w-[140px]">
                  {selectedCourse.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {selectedCourse.level}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              My Courses
            </DropdownMenuLabel>
            
            {COURSES.map((course) => (
              <DropdownMenuItem
                key={course.id}
                onSelect={() => setSelectedCourse(course)}
                className="gap-2 p-2"
              >
                <div className={`flex size-6 items-center justify-center rounded-md ${course.color}`}>
                  <course.icon className="size-3" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{course.title}</span>
                  <span className="text-[10px] text-muted-foreground">{course.level}</span>
                </div>
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <BookOpen className="size-3" />
              </div>
              <span className="text-sm font-medium text-muted-foreground tracking-tight">
                View Catalog
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}