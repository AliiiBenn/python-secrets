import { StateCreator } from 'zustand'
import { FileNode, FileNodeType } from './types'
import { IDEState } from './use-ide-store'

export interface FileSlice {
  files: FileNode[]
  currentFolderId: string | null
  addNode: (name: string, type: FileNodeType, parentId: string | null) => boolean
  renameNode: (id: string, newName: string) => boolean
  deleteNode: (id: string) => void
  updateFileContent: (id: string, content: string) => void
  toggleFolder: (id: string) => void
  toggleLock: (id: string) => void
  isNodeLocked: (id: string) => boolean
}

export const createFileSlice: StateCreator<IDEState, [], [], FileSlice> = (set, get) => ({
  files: [
    { id: 'root-1', name: 'src', type: 'folder', parentId: null, isOpen: true, isLocked: false },
    { id: 'file-1', name: 'main.py', type: 'file', parentId: 'root-1', content: 'print("Hello World")', isLocked: false },
  ],
  currentFolderId: null,

  isNodeLocked: (id) => {
    const { files } = get()
    const checkLock = (nodeId: string | null): boolean => {
      if (!nodeId) return false
      const node = files.find(f => f.id === nodeId)
      if (!node) return false
      if (node.isLocked) return true
      return checkLock(node.parentId)
    }
    return checkLock(id)
  },

  addNode: (name, type, parentId) => {
    const { files, isNodeLocked } = get()
    if (parentId && isNodeLocked(parentId)) return false
    const exists = files.some(f => f.parentId === parentId && f.name.toLowerCase() === name.toLowerCase())
    if (exists) return false

    set((state) => ({
      files: [...state.files, {
        id: Math.random().toString(36).substring(7),
        name,
        type,
        parentId,
        isOpen: type === 'folder' ? true : undefined,
        isLocked: false,
        content: type === 'file' ? '' : undefined
      }]
    }))
    return true
  },

  renameNode: (id, newName) => {
    const { files, isNodeLocked } = get()
    const node = files.find(f => f.id === id)
    if (!node || isNodeLocked(id)) return false
    const exists = files.some(f => f.parentId === node.parentId && f.id !== id && f.name.toLowerCase() === newName.toLowerCase())
    if (exists) return false

    set((state) => ({
      files: state.files.map((f) => f.id === id ? { ...f, name: newName } : f)
    }))
    return true
  },

  updateFileContent: (id, content) => {
    if (get().isNodeLocked(id)) return
    set((state) => ({
      files: state.files.map((f) => f.id === id ? { ...f, content } : f)
    }))
  },

  deleteNode: (id) => {
    if (get().isNodeLocked(id)) return
    set((state) => {
      const getChildIds = (parentId: string): string[] => {
        const children = state.files.filter(f => f.parentId === parentId)
        return children.reduce((acc, curr) => [...acc, curr.id, ...getChildIds(curr.id)], [] as string[])
      }
      const idsToRemove = [id, ...getChildIds(id)]
      return {
        files: state.files.filter((f) => !idsToRemove.includes(f.id)),
        openTabIds: state.openTabIds.filter(tabId => !idsToRemove.includes(tabId)),
        activeFileId: idsToRemove.includes(state.activeFileId || '') ? null : state.activeFileId
      }
    })
  },

  toggleFolder: (id) => set((state) => ({
    files: state.files.map((f) => f.id === id ? { ...f, isOpen: !f.isOpen } : f)
  })),

  toggleLock: (id) => set((state) => ({
    files: state.files.map((f) => f.id === id ? { ...f, isLocked: !f.isLocked } : f)
  }))
})