"use client"

import React, { useState } from "react"
import { Folder, File, ChevronRight, ChevronDown, FolderPlus, FilePlus, Pencil, Trash2, Lock, Unlock } from "lucide-react"
import { useIDEStore } from "@/core/ide/stores/use-ide-store"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FileNodeType } from "../stores/types"

export const FileSystem = () => {
  const { files, addNode, renameNode, deleteNode, toggleFolder, toggleLock, openTab, activeFileId, isNodeLocked } = useIDEStore()
  const [error, setError] = useState<string | null>(null)
  const [dialogConfig, setDialogConfig] = useState<{ type: 'create' | 'rename' | 'delete', nodeType?: FileNodeType, nodeId?: string, parentId?: string | null, currentName?: string } | null>(null)
  const [inputValue, setInputValue] = useState("")

  const handleConfirm = () => {
    if (!dialogConfig) return
    setError(null)
    let success = true
    if (dialogConfig.type === 'create' && inputValue) success = addNode(inputValue, dialogConfig.nodeType!, dialogConfig.parentId || null)
    else if (dialogConfig.type === 'rename' && inputValue && dialogConfig.nodeId) success = renameNode(dialogConfig.nodeId, inputValue)
    else if (dialogConfig.type === 'delete' && dialogConfig.nodeId) deleteNode(dialogConfig.nodeId)
    
    if (success) { setDialogConfig(null); setInputValue("") }
    else setError("An item with this name already exists or path is locked.")
  }

  const renderTree = (parentId: string | null = null, level = 0) => {
    return files
      .filter((f) => f.parentId === parentId)
      .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'folder' ? -1 : 1))
      .map((node) => {
        const locked = isNodeLocked(node.id)
        const selfLocked = node.isLocked
        
        return (
          <div key={node.id} className="relative">
            <ContextMenu>
              <ContextMenuTrigger>
                <div 
                  onClick={() => node.type === 'folder' ? toggleFolder(node.id) : openTab(node.id, false)}
                  onContextMenu={() => node.type === 'file' && openTab(node.id, true)}
                  onAuxClick={(e) => {
                    if (node.type === 'file' && e.button === 1) {
                      e.preventDefault()
                      openTab(node.id, false)
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-muted text-sm select-none group relative z-10", 
                    activeFileId === node.id && "bg-accent text-accent-foreground"
                  )} 
                  // On réduit le padding initial et on laisse la marge du conteneur parent gérer l'indentation
                  style={{ paddingLeft: level === 0 ? "16px" : "12px" }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {node.type === 'folder' ? (
                      node.isOpen ? <ChevronDown size={14} className="shrink-0" /> : <ChevronRight size={14} className="shrink-0" />
                    ) : (
                        // Placeholder pour aligner les fichiers avec les dossiers qui ont un chevron
                        <div className="w-[14px] shrink-0" />
                    )}
                    
                    {node.type === 'folder' ? (
                      <Folder size={14} className="text-primary fill-primary/20 shrink-0" />
                    ) : (
                      <File size={14} className="text-muted-foreground shrink-0" />
                    )}
                    
                    <span className={cn("truncate flex-1", locked && "text-muted-foreground")}>
                      {node.name}
                    </span>
                    {selfLocked && <Lock size={10} className="text-muted-foreground/50 shrink-0" />}
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                {node.type === 'folder' && (
                  <>
                    <ContextMenuItem disabled={locked} onClick={() => { setDialogConfig({ type: 'create', nodeType: 'file', parentId: node.id }); setInputValue(""); setError(null) }}><FilePlus size={14} className="mr-2" /> New File</ContextMenuItem>
                    <ContextMenuItem disabled={locked} onClick={() => { setDialogConfig({ type: 'create', nodeType: 'folder', parentId: node.id }); setInputValue(""); setError(null) }}><FolderPlus size={14} className="mr-2" /> New Folder</ContextMenuItem>
                    <ContextMenuSeparator />
                  </>
                )}
                <ContextMenuItem disabled={locked} onClick={() => { setDialogConfig({ type: 'rename', nodeId: node.id, currentName: node.name }); setInputValue(node.name); setError(null) }}><Pencil size={14} className="mr-2" /> Rename</ContextMenuItem>
                <ContextMenuItem disabled={locked} className="text-destructive" onClick={() => { setDialogConfig({ type: 'delete', nodeId: node.id, currentName: node.name }); setError(null) }}><Trash2 size={14} className="mr-2" /> Delete</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => toggleLock(node.id)}>{selfLocked ? <Unlock size={14} className="mr-2" /> : <Lock size={14} className="mr-2" />}{selfLocked ? "Unlock" : "Lock"}</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Conteneur pour les enfants avec la ligne verticale */}
            {node.type === 'folder' && node.isOpen && (
              <div className="ml-[22px] border-l border-border/50">
                {renderTree(node.id, level + 1)}
              </div>
            )}
          </div>
        )
      })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="h-12 border-b flex items-center justify-between px-4 shrink-0">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Explorer</span>
      </div>
      <ContextMenu>
        <ContextMenuTrigger className="flex-1 overflow-y-auto pt-2">
          <div className="min-h-full">
            {renderTree(null)}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem onClick={() => { setDialogConfig({ type: 'create', nodeType: 'file', parentId: null }); setInputValue(""); setError(null) }}><FilePlus size={14} className="mr-2" /> New File</ContextMenuItem>
          <ContextMenuItem onClick={() => { setDialogConfig({ type: 'create', nodeType: 'folder', parentId: null }); setInputValue(""); setError(null) }}><FolderPlus size={14} className="mr-2" /> New Folder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      
      {/* Dialogs inchangés */}
      <Dialog open={!!dialogConfig} onOpenChange={() => setDialogConfig(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{dialogConfig?.type === 'create' && `Create New ${dialogConfig.nodeType}`}{dialogConfig?.type === 'rename' && `Rename ${dialogConfig.currentName}`}{dialogConfig?.type === 'delete' && `Delete ${dialogConfig.currentName}`}</DialogTitle></DialogHeader>
          {dialogConfig?.type !== 'delete' ? (
            <div className="space-y-2">
              <Input value={inputValue} onChange={(e) => { setInputValue(e.target.value); setError(null) }} placeholder="Enter name..." autoFocus onKeyDown={(e) => e.key === 'Enter' && handleConfirm()} />
              {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}
            </div>
          ) : (<p className="text-sm text-muted-foreground">Are you sure you want to delete this item?</p>)}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogConfig(null)}>Cancel</Button>
            <Button variant={dialogConfig?.type === 'delete' ? 'destructive' : 'default'} onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}