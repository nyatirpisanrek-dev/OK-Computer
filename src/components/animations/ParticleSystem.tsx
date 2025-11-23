'use client'

import { useEffect, useRef } from 'react'
import { useParticleSystem } from '@/lib/hooks/useParticleSystem'

interface ParticleSystemProps {
  count?: number
  colors?: string[]
  size?: { min: number; max: number }
  speed?: { min: number; max: number }
  life?: { min: number; max: number }
  gravity?: number
  attraction?: { x: number; y: number; strength: number }
  className?: string
}

export function ParticleSystem({
  count = 50,
  colors = ['#00ff88', '#8b5cf6', '#ec4899', '#3b82f6'],
  size = { min: 1, max: 4 },
  speed = { min: 20, max: 100 },
  life = { min: 2, max: 8 },
  gravity = 0,
  attraction,
  className = '',
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useParticleSystem(canvasRef, {
    count,
    colors,
    size,
    speed,
    life,
    gravity,
    attraction,
  })

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
