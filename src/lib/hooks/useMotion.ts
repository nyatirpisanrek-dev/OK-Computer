'use client'

import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function useMousePosition() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}

export function useSpringValue(value: number, config?: any) {
  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, config)

  return { motionValue, springValue }
}

export function useParallax(offset: number = 50) {
  const { mouseX, mouseY } = useMousePosition()

  const x = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-offset, offset])
  const y = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-offset, offset])

  return { x, y }
}
