import { useEffect, useState } from 'react'
import '../Styles/CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ 
        x: e.clientX, 
        y: e.clientY 
      })
    }

    document.addEventListener('mousemove', updatePosition)
    return () => document.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <div 
      className="cursor-glow"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}