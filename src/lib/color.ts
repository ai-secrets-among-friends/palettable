export interface HSLColor {
  h: number
  s: number
  l: number
}

export interface RGBColor {
  r: number
  g: number
  b: number
}

/** HSL (h: 0-360, s: 0-100, l: 0-100) -> RGB (0-255) */
export function hslToRgb({ h, s, l }: HSLColor): RGBColor {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2

  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (h < 60) [r1, g1, b1] = [c, x, 0]
  else if (h < 120) [r1, g1, b1] = [x, c, 0]
  else if (h < 180) [r1, g1, b1] = [0, c, x]
  else if (h < 240) [r1, g1, b1] = [0, x, c]
  else if (h < 300) [r1, g1, b1] = [x, 0, c]
  else [r1, g1, b1] = [c, 0, x]

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  }
}

/** RGB (0-255) -> HSL (h: 0-360, s: 0-100, l: 0-100) */
export function rgbToHsl({ r, g, b }: RGBColor): HSLColor {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  const l = (max + min) / 2

  if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) }

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
  else if (max === gn) h = ((bn - rn) / d + 2) * 60
  else h = ((rn - gn) / d + 4) * 60

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

/** HSL -> HEX string (#RRGGBB) */
export function hslToHex(hsl: HSLColor): string {
  return rgbToHex(hslToRgb(hsl))
}

/** HEX string -> HSL */
export function hexToHsl(hex: string): HSLColor {
  return rgbToHsl(hexToRgb(hex))
}

/** RGB -> HEX string (#RRGGBB) */
export function rgbToHex({ r, g, b }: RGBColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** HEX string -> RGB */
export function hexToRgb(hex: string): RGBColor {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

export function formatRgb({ r, g, b }: RGBColor): string {
  return `rgb(${r}, ${g}, ${b})`
}

export function formatHsl({ h, s, l }: HSLColor): string {
  return `hsl(${h}, ${s}%, ${l}%)`
}

/** WCAG relative luminance from sRGB (0-255) */
export function relativeLuminance({ r, g, b }: RGBColor): number {
  const linearize = (c: number) => {
    const srgb = c / 255
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/** WCAG contrast ratio between two RGB colors */
export function contrastRatio(a: RGBColor, b: RGBColor): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const lighter = Math.max(la, lb)
  const darker = Math.min(la, lb)
  return (lighter + 0.05) / (darker + 0.05)
}

/** Returns "#ffffff" or "#000000" for readable text on the given background */
export function textColorForBackground(hex: string): string {
  const rgb = hexToRgb(hex)
  const white: RGBColor = { r: 255, g: 255, b: 255 }
  const black: RGBColor = { r: 0, g: 0, b: 0 }
  return contrastRatio(rgb, white) > contrastRatio(rgb, black) ? '#ffffff' : '#000000'
}

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895

/**
 * Generate a palette of 5 colors using golden ratio hue distribution.
 * Respects locked positions — locked colors stay the same.
 */
export function generatePalette(
  locked: boolean[],
  current: string[],
  seed?: number,
): string[] {
  let hue = seed ?? Math.random() * 360

  return Array.from({ length: 5 }, (_, i) => {
    if (locked[i] && current[i]) return current[i]

    hue = (hue + 360 * GOLDEN_RATIO_CONJUGATE) % 360
    const s = Math.round(55 + Math.random() * 30) // 55-85%
    const l = Math.round(45 + Math.random() * 25) // 45-70%
    return hslToHex({ h: Math.round(hue), s, l })
  })
}
