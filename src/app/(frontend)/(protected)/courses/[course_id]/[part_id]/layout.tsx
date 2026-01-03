import { FloatingSidebarTrigger } from "@/components/courses/sidebar-trigger";
import { CourseSidebar } from "@/components/courses/sidebars";
import { AppHeader } from "@/components/headers/app-header";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ course_id: string, part_id: string }>;
}) {
  const { course_id: courseId, part_id: partId } = await params;

  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <AppHeader />
        <div>{children}</div>
        <FloatingSidebarTrigger />
      </SidebarInset>
    </SidebarProvider>
  );
}
