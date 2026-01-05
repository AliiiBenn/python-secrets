"use client"

import React from "react"
import { ChevronDown, ChevronUp, Terminal } from "lucide-react"

interface ConsoleProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const Console = ({ isCollapsed, onToggle }: ConsoleProps) => {
  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-hidden">
      {/* HEADER : Ajout du Double Clic ici */}
      <div 
        onDoubleClick={onToggle}
        className="h-10 border-b border-white/5 flex items-center justify-between px-4 shrink-0 cursor-pointer select-none hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-zinc-500" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Preview / Output
          </span>
        </div>
        
        {/* BOUTON DE TOGGLE (Gardé pour l'accessibilité) */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Empêche le déclenchement du double clic si on clique sur le bouton
            onToggle();
          }}
          className="p-1 hover:bg-white/10 rounded transition-colors text-zinc-500"
        >
          {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* CONTENU */}
      <div className="flex-1 p-4 font-mono text-[12px] text-emerald-500 overflow-y-auto">
        <div className="text-zinc-500 opacity-50">$ running build...</div>
        <div className="mt-2 text-zinc-300 font-sans italic">
           Double-cliquez sur le header pour {isCollapsed ? "ouvrir" : "fermer"}.
        </div>
      </div>
    </div>
  )
}