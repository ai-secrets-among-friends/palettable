import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { getHarmonies } from '@/lib/harmony'
import { HarmonyGroup } from './HarmonyGroup'

interface HarmonyAnalyzerProps {
  onApply: (colors: string[]) => void
}

export function HarmonyAnalyzer({ onApply }: HarmonyAnalyzerProps) {
  const [baseColor, setBaseColor] = useState('#6d28d9')
  const harmonies = getHarmonies(baseColor)

  const handleHexInput = (value: string) => {
    const clean = value.startsWith('#') ? value : `#${value}`
    if (/^#[0-9a-fA-F]{0,6}$/.test(clean)) {
      setBaseColor(clean)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Color picker */}
      <div className="glass rounded-lg p-4 flex items-center gap-4 flex-wrap">
        <label className="text-sm font-medium text-foreground">Base Color</label>
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer border-0 bg-transparent"
        />
        <Input
          value={baseColor.toUpperCase()}
          onChange={(e) => handleHexInput(e.target.value)}
          className="w-28 font-mono text-sm"
        />
        <div
          className="w-10 h-10 rounded-lg border border-white/10"
          style={{ backgroundColor: baseColor }}
        />
      </div>

      {/* Harmony groups */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {harmonies.map((h) => (
          <HarmonyGroup
            key={h.type}
            label={h.label}
            colors={h.colors}
            onApply={onApply}
          />
        ))}
      </div>
    </div>
  )
}
