import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CopyButton } from './CopyButton'
import { textColorForBackground } from '@/lib/color'

interface HarmonyGroupProps {
  label: string
  colors: string[]
  onApply: (colors: string[]) => void
}

export function HarmonyGroup({ label, colors, onApply }: HarmonyGroupProps) {
  return (
    <div className="glass rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onApply(colors)}
          className="gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Apply
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span
                className="text-[9px] font-mono font-semibold"
                style={{ color: textColorForBackground(color) }}
              >
                {color.toUpperCase()}
              </span>
            </div>
            <CopyButton text={color.toUpperCase()} className="h-6 px-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
