import { useState } from 'react'
import {
  type SavedPalette,
  loadPalettes,
  savePalettes,
  exportPalettesJSON,
} from '@/lib/storage'

export function useSavedPalettes() {
  const [palettes, setPalettes] = useState<SavedPalette[]>(loadPalettes)

  const save = (name: string, colors: string[]) => {
    const palette: SavedPalette = {
      id: crypto.randomUUID(),
      name,
      colors,
      createdAt: new Date().toISOString(),
    }
    const next = [palette, ...palettes]
    setPalettes(next)
    savePalettes(next)
  }

  const remove = (id: string) => {
    const next = palettes.filter((p) => p.id !== id)
    setPalettes(next)
    savePalettes(next)
  }

  const exportJSON = () => exportPalettesJSON(palettes)

  return { palettes, save, remove, exportJSON }
}
