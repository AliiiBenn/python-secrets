'use client'

import { useEffect, useState } from 'react'

export interface Heading {
  id: string
  text: string
  level: number
}

export function useTableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extraire les headings du DOM
    const elements = Array.from(
      document.querySelectorAll('article h1, article h2, article h3, article h4')
    )

    const headingList: Heading[] = elements.map((element) => {
      const id = element.id || generateId(element.textContent || '')
      const level = parseInt(element.tagName.substring(1))

      // Ajouter l'ID si manquant
      if (!element.id) {
        element.id = id
      }

      return {
        id,
        text: element.textContent || '',
        level,
      }
    })

    setHeadings(headingList)

    // Intersection Observer pour highlight la section active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    )

    // Observer tous les headings
    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  return { headings, activeId }
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .substring(0, 50)
}
