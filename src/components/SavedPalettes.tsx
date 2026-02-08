import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PaletteCard } from './PaletteCard'
import type { SavedPalette } from '@/lib/storage'

interface SavedPalettesProps {
  palettes: SavedPalette[]
  onLoad: (colors: string[]) => void
  onDelete: (id: string) => void
  onExport: () => void
}

export function SavedPalettes({
  palettes,
  onLoad,
  onDelete,
  onExport,
}: SavedPalettesProps) {
  if (palettes.length === 0) {
    return (
      <div className="glass rounded-lg p-12 text-center">
        <p className="text-muted-foreground">No saved palettes yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Generate a palette and click Save to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="secondary" onClick={onExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export All as JSON
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {palettes.map((p) => (
          <PaletteCard
            key={p.id}
            palette={p}
            onLoad={onLoad}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}
