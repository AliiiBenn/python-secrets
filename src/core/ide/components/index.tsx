"use client"

import React, { useRef, useState } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import type { ImperativePanelHandle } from "react-resizable-panels"

import { FileSystem } from "./file-system"
import { Editor } from "./editor"
import { Console } from "./console"

export const IDE = () => {
  // Référence pour manipuler le panneau du bas
  const consolePanelRef = useRef<ImperativePanelHandle>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleConsole = () => {
    const panel = consolePanelRef.current
    if (panel) {
      if (isCollapsed) {
        panel.expand() // Revient à la taille par défaut
      } else {
        panel.collapse() // Se réduit à la taille "collapsedSize"
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        
        {/* COLONNE GAUCHE */}
        <ResizablePanel defaultSize={20} minSize={15} className="bg-muted/10">
          <FileSystem />
        </ResizablePanel>

        <ResizableHandle />

        {/* COLONNE DROITE */}
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            
            {/* LIGNE DU HAUT : Editeur */}
            <ResizablePanel defaultSize={70} minSize={30}>
              <Editor />
            </ResizablePanel>

            <ResizableHandle />

            {/* LIGNE DU BAS : Console / Terminal */}
            <ResizablePanel 
              ref={consolePanelRef}
              defaultSize={30} 
              collapsible={true}
              collapsedSize={4} // Environ 40px de hauteur pour garder le header visible
              minSize={10}
              onCollapse={() => setIsCollapsed(true)}
              onExpand={() => setIsCollapsed(false)}
              className="flex flex-col"
            >
              <Console 
                isCollapsed={isCollapsed} 
                onToggle={toggleConsole} 
              />
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  )
}