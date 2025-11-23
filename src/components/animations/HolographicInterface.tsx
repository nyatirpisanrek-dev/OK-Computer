'use client'

import { useRef } from 'react'
import { useHolographicInterface } from '@/lib/hooks/useHolographicInterface'

interface HolographicInterfaceProps {
  children?: React.ReactNode
  layers?: number
  depth?: number
  parallax?: number
  distortion?: number
  chromaticAberration?: number
  scanlines?: boolean
  flicker?: boolean
  className?: string
}

export function HolographicInterface({
  children,
  layers = 5,
  depth = 0.5,
  parallax = 0.5,
  distortion = 0.2,
  chromaticAberration = 2,
  scanlines = true,
  flicker = true,
  className = '',
}: HolographicInterfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const holographicData = useHolographicInterface(containerRef, {
    layers,
    depth,
    parallax,
    distortion,
    chromaticAberration,
    scanlines,
    flicker,
  })

  const renderHologramLayer = (holographicData as any)?.renderHologramLayer || (() => null)

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Render multiple holographic layers */}
      {Array.from({ length: layers }, (_, i) =>
        renderHologramLayer(children, i)
      )}

      {/* Base content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
