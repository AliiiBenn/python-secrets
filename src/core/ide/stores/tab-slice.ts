import { StateCreator } from 'zustand'
import { IDEState } from './use-ide-store'

export interface TabSlice {
  openTabIds: string[]
  activeFileId: string | null
  openTab: (id: string, replace?: boolean) => void
  closeTab: (id: string) => void
  setActiveFile: (id: string) => void
}

export const createTabSlice: StateCreator<IDEState, [], [], TabSlice> = (set, get) => ({
  openTabIds: ['file-1'],
  activeFileId: 'file-1',

  openTab: (id, replace = false) => {
    const { openTabIds, activeFileId } = get()
    
    if (openTabIds.includes(id)) {
      set({ activeFileId: id })
      return
    }

    if (replace && activeFileId) {
      set({
        openTabIds: openTabIds.map(tabId => tabId === activeFileId ? id : tabId),
        activeFileId: id
      })
    } else {
      set({
        openTabIds: [...openTabIds, id],
        activeFileId: id
      })
    }
  },

  closeTab: (id) => {
    set((state) => {
      const newTabs = state.openTabIds.filter(tabId => tabId !== id)
      let nextActive = state.activeFileId
      
      if (state.activeFileId === id) {
        nextActive = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null
      }
      
      return {
        openTabIds: newTabs,
        activeFileId: nextActive
      }
    })
  },

  setActiveFile: (id) => set({ activeFileId: id })
})