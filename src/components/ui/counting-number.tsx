'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CountingNumberProps {
  from: number
  to: number
  duration: number
  className?: string
  suffix?: string
}

export function CountingNumber({ from, to, duration, className, suffix = '' }: CountingNumberProps) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(from + (to - from) * progress)
      setCount(currentCount)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  }, [from, to, duration])

  return (
    <span className={cn(className)}>
      {count}{suffix}
    </span>
  )
}
