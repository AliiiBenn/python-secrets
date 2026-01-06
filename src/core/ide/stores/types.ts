export type FileNodeType = 'file' | 'folder'

export interface FileNode {
  id: string
  name: string
  type: FileNodeType
  parentId: string | null
  isOpen?: boolean
  isLocked?: boolean
  content?: string
}

export interface TerminalLine {
  text: string
  type: 'command' | 'output' | 'error'
}