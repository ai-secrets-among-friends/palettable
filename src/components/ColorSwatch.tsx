import { Lock, Unlock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from './CopyButton'
import {
  textColorForBackground,
  hexToRgb,
  formatRgb,
  contrastRatio,
} from '@/lib/color'

interface ColorSwatchProps {
  color: string
  locked: boolean
  onToggleLock: () => void
}

export function ColorSwatch({ color, locked, onToggleLock }: ColorSwatchProps) {
  const textColor = textColorForBackground(color)
  const rgb = hexToRgb(color)
  const white = { r: 255, g: 255, b: 255 }
  const ratio = contrastRatio(rgb, white)

  return (
    <div
      className="relative flex-1 flex flex-col items-center justify-end gap-3 p-4 transition-all duration-300 group min-h-[120px] md:min-h-0"
      style={{ backgroundColor: color }}
    >
      {/* Contrast badge */}
      <Badge
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
        style={{ color: textColor, borderColor: textColor + '40' }}
        variant="outline"
      >
        {ratio.toFixed(1)}:1
      </Badge>

      {/* Actions — visible on hover */}
      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleLock}
          className="h-8 w-8"
          style={{ color: textColor }}
        >
          {locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </Button>
        <CopyButton
          text={color.toUpperCase()}
          label="HEX"
          className="text-xs"
        />
        <CopyButton
          text={formatRgb(rgb)}
          label="RGB"
          className="text-xs"
        />
      </div>

      {/* Color hex label */}
      <span
        className="font-mono text-sm font-semibold tracking-wide"
        style={{ color: textColor }}
      >
        {color.toUpperCase()}
      </span>
    </div>
  )
}
