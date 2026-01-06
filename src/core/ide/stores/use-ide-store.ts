import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createFileSlice, FileSlice } from './file-slice'
import { createTabSlice, TabSlice } from './tab-slice'
import { createTerminalSlice, TerminalSlice } from './terminal-slice'

export type IDEState = FileSlice & TabSlice & TerminalSlice

export const useIDEStore = create<IDEState>()(
  persist(
    (...a) => ({
      ...createFileSlice(...a),
      ...createTabSlice(...a),
      ...createTerminalSlice(...a),
    }),
    {
      name: 'ide-storage',
      partialize: (state) => ({ 
        files: state.files, 
        activeFileId: state.activeFileId,
        openTabIds: state.openTabIds 
      })
    }
  )
)