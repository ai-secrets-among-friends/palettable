import { useReducer } from 'react'
import { generatePalette } from '@/lib/color'

interface PaletteState {
  colors: string[]
  locked: boolean[]
}

type PaletteAction =
  | { type: 'generate' }
  | { type: 'toggle_lock'; index: number }
  | { type: 'set_color'; index: number; color: string }
  | { type: 'load'; colors: string[] }

function reducer(state: PaletteState, action: PaletteAction): PaletteState {
  switch (action.type) {
    case 'generate':
      return { ...state, colors: generatePalette(state.locked, state.colors) }
    case 'toggle_lock':
      return {
        ...state,
        locked: state.locked.map((l, i) => (i === action.index ? !l : l)),
      }
    case 'set_color':
      return {
        ...state,
        colors: state.colors.map((c, i) => (i === action.index ? action.color : c)),
      }
    case 'load':
      return { colors: action.colors, locked: [false, false, false, false, false] }
  }
}

const initialState: PaletteState = {
  colors: generatePalette(
    [false, false, false, false, false],
    ['', '', '', '', ''],
  ),
  locked: [false, false, false, false, false],
}

export function usePalette() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    colors: state.colors,
    locked: state.locked,
    generate: () => dispatch({ type: 'generate' }),
    toggleLock: (index: number) => dispatch({ type: 'toggle_lock', index }),
    setColor: (index: number, color: string) =>
      dispatch({ type: 'set_color', index, color }),
    loadColors: (colors: string[]) => dispatch({ type: 'load', colors }),
  }
}
