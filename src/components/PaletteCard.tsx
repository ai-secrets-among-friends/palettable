import { Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SavedPalette } from '@/lib/storage'

interface PaletteCardProps {
  palette: SavedPalette
  onLoad: (colors: string[]) => void
  onDelete: (id: string) => void
}

export function PaletteCard({ palette, onLoad, onDelete }: PaletteCardProps) {
  const date = new Date(palette.createdAt).toLocaleDateString()

  return (
    <div className="glass rounded-lg p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform">
      {/* Color dots */}
      <div className="flex gap-1.5">
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 h-8 first:rounded-l-md last:rounded-r-md"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground truncate max-w-[140px]">
            {palette.name}
          </p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onLoad(palette.colors)}
          >
            <Upload className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={() => onDelete(palette.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
