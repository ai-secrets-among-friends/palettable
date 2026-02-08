import { useEffect, useState } from 'react'
import { Shuffle, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ColorSwatch } from './ColorSwatch'

interface PaletteGeneratorProps {
  colors: string[]
  locked: boolean[]
  onGenerate: () => void
  onToggleLock: (index: number) => void
  onSave: (name: string) => void
}

export function PaletteGenerator({
  colors,
  locked,
  onGenerate,
  onToggleLock,
  onSave,
}: PaletteGeneratorProps) {
  const [saveName, setSaveName] = useState('')
  const [showSave, setShowSave] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        onGenerate()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onGenerate])

  const handleSave = () => {
    if (!showSave) {
      setShowSave(true)
      return
    }
    const name = saveName.trim() || 'Untitled'
    onSave(name)
    setSaveName('')
    setShowSave(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Swatches */}
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden h-[60vh]">
        {colors.map((color, i) => (
          <ColorSwatch
            key={i}
            color={color}
            locked={locked[i]}
            onToggleLock={() => onToggleLock(i)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 justify-center flex-wrap">
        <Button onClick={onGenerate} className="gap-2">
          <Shuffle className="h-4 w-4" />
          Generate
        </Button>

        {showSave && (
          <Input
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Palette name..."
            className="w-48"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
            }}
            autoFocus
          />
        )}

        <Button variant="secondary" onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>

        <span className="text-muted-foreground text-xs hidden md:inline">
          Press spacebar to generate
        </span>
      </div>
    </div>
  )
}
