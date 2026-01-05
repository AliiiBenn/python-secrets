'use client'

import React from 'react'
import { Play, SendHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Editor = () => {
  const handleRun = () => {
    console.log('Running code...')
  }

  const handleSubmit = () => {
    console.log('Submitting code...')
  }

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <header className="h-12 border-b flex items-center justify-between px-4 bg-muted/5">
        {/* Gauche : Nom du fichier */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium italic text-muted-foreground">main.py</span>
        </div>

        {/* Droite : Boutons shadcn */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            className='h-8'
          >
            <Play size={14} />
            Run
          </Button>

          <Button variant="default" size="sm" onClick={handleSubmit}
            className='h-8'>
            <SendHorizontal size={14} />
            Submit
          </Button>
        </div>
      </header>

      {/* ZONE DE CODE */}
      <div className="flex-1 flex items-center justify-center bg-card text-muted-foreground text-xs uppercase tracking-tighter">
        Code Content (Monaco)
      </div>
    </div>
  )
}
