'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BubbleBackgroundProps {
  interactive?: boolean
  className?: string
}

export function BubbleBackground({ interactive = false, className }: BubbleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const bubbles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
    }> = []

    const colors = ['#00ffff', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981']

    const createBubble = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    }

    for (let i = 0; i < 20; i++) {
      bubbles.push(createBubble())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach(bubble => {
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        if (bubble.x < 0 || bubble.x > canvas.width) bubble.vx *= -1
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.vy *= -1

        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = bubble.color
        ctx.globalAlpha = 0.3
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className={cn('absolute inset-0', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
      />
    </div>
  )
}
