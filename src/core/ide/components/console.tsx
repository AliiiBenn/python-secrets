"use client"

import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Terminal as TerminalIcon } from "lucide-react"
import { useIDEStore } from "@/core/ide/stores/use-ide-store"
import { cn } from "@/lib/utils"

interface ConsoleProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const Console = ({ isCollapsed, onToggle }: ConsoleProps) => {
  const { terminalLines, executeCommand, commandHistory, historyIndex, setHistoryIndex, files, currentFolderId } = useIDEStore()
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [terminalLines])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { executeCommand(input); setInput("") }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = historyIndex + 1
      if (nextIndex < commandHistory.length) { setHistoryIndex(nextIndex); setInput(commandHistory[nextIndex]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = historyIndex - 1
      if (nextIndex >= 0) { setHistoryIndex(nextIndex); setInput(commandHistory[nextIndex]) }
      else { setHistoryIndex(-1); setInput("") }
    }
  }

  return (
    <div 
      className="flex flex-col h-full bg-background overflow-hidden font-mono border-t" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header de la console */}
      <div 
        onDoubleClick={onToggle} 
        className="h-10 border-b flex items-center justify-between px-4 shrink-0 cursor-pointer select-none hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Terminal</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(); }} 
          className="p-1 hover:bg-accent rounded transition-colors text-muted-foreground"
        >
          {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Zone de texte du terminal */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col p-2 text-[12px] overflow-hidden">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2">
            {terminalLines.map((line, i) => (
              <div 
                key={i} 
                className={cn(
                  "break-all",
                  line.type === 'command' && "text-muted-foreground", 
                  line.type === 'output' && "text-emerald-500", 
                  line.type === 'error' && "text-destructive"
                )}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Ligne d'input */}
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <span className="text-primary font-bold">
              {(!currentFolderId ? "~" : files.find(f => f.id === currentFolderId)?.name)}
            </span>
            <span className="text-muted-foreground">$</span>
            <input 
              ref={inputRef} 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyDown} 
              className="flex-1 bg-transparent border-none outline-none text-foreground" 
              autoFocus 
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      )}
    </div>
  )
}