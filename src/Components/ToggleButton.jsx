import { ReactNode } from 'react'


export default function ToggleButton(Props) {
  return (
    <button
      className={`toggle-button ${
        selected === defaultValue
          ? 'ring-scale-400 border-scale-800 ring-2 drop-shadow-lg border-2'
          : ''
      } ${className}`}
      style={{ backgroundColor: `${color}` }}
      onClick={() => {
        setSelected(defaultValue)
      }}
    >
      {children}
    </button>
  )
}