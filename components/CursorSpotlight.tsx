'use client'

import { useEffect, useState } from 'react'

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* Only show on devices with a pointer (not touch) */
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute rounded-full"
        style={{
          left: pos.x - 200,
          top: pos.y - 200,
          width: 400,
          height: 400,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />
    </div>
  )
}
