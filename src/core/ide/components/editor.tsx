"use client"

import React from 'react'
import { Play, SendHorizontal, Lock, X, PanelLeftOpen, PanelLeftClose } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIDEStore } from '@/core/ide/stores/use-ide-store'
import MonacoEditor from '@monaco-editor/react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface EditorProps {
  onToggleFileSystem: () => void
  isFsCollapsed: boolean
}

export const Editor = ({ onToggleFileSystem, isFsCollapsed }: EditorProps) => {
  const { files, activeFileId, openTabIds, closeTab, openTab, isNodeLocked, updateFileContent } = useIDEStore()
  
  const activeFile = files.find(f => f.id === activeFileId)
  const locked = activeFile ? isNodeLocked(activeFile.id) : false

  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()
    switch (ext) {
      case 'py': return 'python'
      case 'js': return 'javascript'
      case 'ts': return 'typescript'
      case 'html': return 'html'
      case 'css': return 'css'
      case 'json': return 'json'
      default: return 'plaintext'
    }
  }

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-background">
      <header className="h-12 border-b flex items-center justify-between bg-muted/20 shrink-0">
        <div className="flex items-center h-full overflow-x-auto no-scrollbar">
          {openTabIds.map((tabId) => {
            const file = files.find(f => f.id === tabId)
            if (!file) return null
            const isActive = activeFileId === tabId
            const isTabLocked = isNodeLocked(file.id)

            return (
              <div
                key={tabId}
                onClick={() => openTab(tabId)}
                className={cn(
                  "h-full flex items-center gap-2 px-4 border-r cursor-pointer select-none transition-colors",
                  isActive ? "bg-background text-foreground" : "text-muted-foreground hover:bg-muted/40"
                )}
              >
                <span className={cn("text-xs font-medium flex items-center gap-2", isActive && "italic")}>
                  {file.name}
                  {isTabLocked && <Lock size={10} className="text-muted-foreground/50" />}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); closeTab(tabId); }}
                  className="hover:bg-accent rounded-sm p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3 px-4 h-full">
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className='h-8'><Play size={14} /> Run</Button>
            <Button variant="default" size="sm" className='h-8'><SendHorizontal size={14} /> Submit</Button>
          </div>
        </div>
      </header>
      
      <div className="flex-1">
        {activeFile ? (
          <MonacoEditor
            theme="vs-dark"
            language={getLanguage(activeFile.name)}
            value={activeFile.content}
            onChange={(value) => updateFileContent(activeFile.id, value || "")}
            options={{
              readOnly: locked,
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-xs uppercase tracking-tighter">
            Select a file to start coding
          </div>
        )}
      </div>

      <div className="absolute bottom-2 left-2 z-10">
        <Button variant="secondary" size="icon" onClick={onToggleFileSystem} className="h-8 w-8 rounded-md border shadow-sm bg-background/80 backdrop-blur">
          {isFsCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </Button>
      </div>
    </div>
  )
}