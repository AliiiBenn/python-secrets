import { StateCreator } from 'zustand'
import { TerminalLine } from './types'
import { IDEState } from './use-ide-store'

export interface TerminalSlice {
  terminalLines: TerminalLine[]
  commandHistory: string[]
  historyIndex: number
  executeCommand: (input: string) => void
  setHistoryIndex: (index: number) => void
  clearTerminal: () => void
}

export const createTerminalSlice: StateCreator<IDEState, [], [], TerminalSlice> = (set, get) => ({
  terminalLines: [{ text: 'Welcome to the IDE Terminal. Type "help" for commands.', type: 'output' }],
  commandHistory: [],
  historyIndex: -1,

  setHistoryIndex: (index) => set({ historyIndex: index }),
  clearTerminal: () => set({ terminalLines: [] }),

  executeCommand: (input) => {
    const trimmed = input.trim()
    if (!trimmed) return
    
    const [cmd, ...args] = trimmed.split(' ')
    const { currentFolderId, files, addNode, clearTerminal } = get()
    const newLines: TerminalLine[] = [{ text: `$ ${trimmed}`, type: 'command' }]

    switch (cmd) {
      case 'help':
        newLines.push({ text: 'Available commands: ls, cd, mkdir, touch, clear, pwd', type: 'output' })
        break

      case 'clear':
        clearTerminal()
        set((state) => ({ 
          commandHistory: [trimmed, ...state.commandHistory.filter(h => h !== trimmed)].slice(0, 50), 
          historyIndex: -1 
        }))
        return

      case 'pwd': {
        const getPath = (id: string | null): string => {
          if (!id) return ''
          const node = files.find(f => f.id === id)
          return node ? `${getPath(node.parentId)}/${node.name}` : ''
        }
        newLines.push({ text: getPath(currentFolderId) || '/', type: 'output' })
        break
      }

      case 'ls': {
        const contents = files.filter(f => f.parentId === currentFolderId)
        if (contents.length === 0) {
          newLines.push({ text: 'empty', type: 'output' })
        } else {
          const list = contents
            .map(f => f.type === 'folder' ? `${f.name}/` : f.name)
            .join('  ')
          newLines.push({ text: list, type: 'output' })
        }
        break
      }

      case 'cd': {
        const target = args[0]
        if (!target || target === '/') {
          set({ currentFolderId: null })
        } else if (target === '..') {
          if (currentFolderId) {
            const current = files.find(f => f.id === currentFolderId)
            set({ currentFolderId: current?.parentId || null })
          }
        } else {
          const folder = files.find(f => f.parentId === currentFolderId && f.name === target && f.type === 'folder')
          if (folder) {
            set({ currentFolderId: folder.id })
          } else {
            newLines.push({ text: `cd: no such directory: ${target}`, type: 'error' })
          }
        }
        break
      }

      case 'mkdir': {
        const folderName = args[0]
        if (!folderName) {
          newLines.push({ text: 'mkdir: missing operand', type: 'error' })
        } else if (!addNode(folderName, 'folder', currentFolderId)) {
          newLines.push({ text: `mkdir: cannot create directory '${folderName}': File exists or locked`, type: 'error' })
        }
        break
      }

      case 'touch': {
        const fileName = args[0]
        if (!fileName) {
          newLines.push({ text: 'touch: missing file operand', type: 'error' })
        } else if (!addNode(fileName, 'file', currentFolderId)) {
          newLines.push({ text: `touch: cannot create file '${fileName}': File exists or locked`, type: 'error' })
        }
        break
      }

      default:
        newLines.push({ text: `command not found: ${cmd}`, type: 'error' })
    }

    set((state) => ({
      terminalLines: [...state.terminalLines, ...newLines],
      commandHistory: [trimmed, ...state.commandHistory.filter(h => h !== trimmed)].slice(0, 50),
      historyIndex: -1
    }))
  }
})