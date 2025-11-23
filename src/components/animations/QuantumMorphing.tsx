'use client'

import { useRef, useEffect, useState } from 'react'
import { useQuantumMorphing } from '@/lib/hooks/useQuantumMorphing'

interface QuantumMorphingProps {
  children: React.ReactNode
  states?: number
  entanglement?: number
  decoherence?: number
  tunneling?: number
  observer?: { x: number; y: number }
  className?: string
}

export function QuantumMorphing({
  children,
  states = 10,
  entanglement = 0.5,
  decoherence = 0.01,
  tunneling = 0.001,
  observer,
  className = '',
}: QuantumMorphingProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  const defaultObserver = observer || { x: windowSize.width / 2, y: windowSize.height / 2 }

  useQuantumMorphing(elementRef, {
    states,
    entanglement,
    decoherence,
    tunneling,
    observer: defaultObserver,
  })

  return (
    <div
      ref={elementRef}
      className={`relative ${className}`}
      style={{
        willChange: 'transform, filter',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  )
}
