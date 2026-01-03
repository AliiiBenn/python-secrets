import { AppHeader } from "@/components/headers/app-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}