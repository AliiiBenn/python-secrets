"use client"

import React, { useRef, useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import type { ImperativePanelHandle } from "react-resizable-panels"
import { FileSystem } from "./file-system"
import { Editor } from "./editor"
import { Console } from "./console"

export const IDE = () => {
  const consolePanelRef = useRef<ImperativePanelHandle>(null)
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false)
  const fileSystemPanelRef = useRef<ImperativePanelHandle>(null)
  const [isFsCollapsed, setIsFsCollapsed] = useState(false)

  const toggleConsole = () => {
    const panel = consolePanelRef.current
    if (panel) isConsoleCollapsed ? panel.expand() : panel.collapse()
  }

  const toggleFileSystem = () => {
    const panel = fileSystemPanelRef.current
    if (panel) isFsCollapsed ? panel.expand() : panel.collapse()
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel 
          ref={fileSystemPanelRef}
          defaultSize={20} 
          minSize={15} 
          collapsible={true}
          collapsedSize={0}
          onCollapse={() => setIsFsCollapsed(true)}
          onExpand={() => setIsFsCollapsed(false)}
          className="bg-muted/10"
        >
          <FileSystem />
        </ResizablePanel>

        {!isFsCollapsed && <ResizableHandle />}

        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={30}>
              <Editor onToggleFileSystem={toggleFileSystem} isFsCollapsed={isFsCollapsed} />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel 
              ref={consolePanelRef}
              defaultSize={30} 
              collapsible={true}
              collapsedSize={4}
              minSize={10}
              onCollapse={() => setIsConsoleCollapsed(true)}
              onExpand={() => setIsConsoleCollapsed(false)}
              className="flex flex-col"
            >
              <Console isCollapsed={isConsoleCollapsed} onToggle={toggleConsole} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}