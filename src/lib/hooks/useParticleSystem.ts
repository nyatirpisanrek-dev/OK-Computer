'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  alpha: number
}

interface ParticleSystemConfig {
  count: number
  colors: string[]
  size: { min: number; max: number }
  speed: { min: number; max: number }
  life: { min: number; max: number }
  gravity?: number
  attraction?: { x: number; y: number; strength: number }
}

export function useParticleSystem(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: ParticleSystemConfig
) {
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = config.colors
    const size = Math.random() * (config.size.max - config.size.min) + config.size.min
    const speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min
    const angle = Math.random() * Math.PI * 2
    const life = Math.random() * (config.life.max - config.life.min) + config.life.min

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
    }
  }, [config])

  const updateParticle = useCallback((particle: Particle, deltaTime: number) => {
    // Apply gravity
    if (config.gravity) {
      particle.vy += config.gravity * deltaTime
    }

    // Apply attraction
    if (config.attraction) {
      const dx = config.attraction.x - particle.x
      const dy = config.attraction.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance > 0) {
        const force = config.attraction.strength / (distance * distance)
        particle.vx += (dx / distance) * force * deltaTime
        particle.vy += (dy / distance) * force * deltaTime
      }
    }

    // Mouse interaction
    const mouseDx = mouseRef.current.x - particle.x
    const mouseDy = mouseRef.current.y - particle.y
    const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
    if (mouseDistance < 100) {
      const repulsion = (100 - mouseDistance) / 100
      particle.vx -= (mouseDx / mouseDistance) * repulsion * 0.5
      particle.vy -= (mouseDy / mouseDistance) * repulsion * 0.5
    }

    // Update position
    particle.x += particle.vx * deltaTime
    particle.y += particle.vy * deltaTime

    // Update life
    particle.life -= deltaTime
    particle.alpha = particle.life / particle.maxLife

    return particle.life > 0
  }, [config])

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    ctx.globalAlpha = particle.alpha
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fill()

    // Add glow effect
    ctx.shadowColor = particle.color
    ctx.shadowBlur = particle.size * 2
    ctx.fill()

    ctx.restore()
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const deltaTime = 0.016 // ~60fps

    // Clear canvas with trail effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const alive = updateParticle(particle, deltaTime)
      if (alive) {
        drawParticle(ctx, particle)
      }
      return alive
    })

    // Spawn new particles
    if (particlesRef.current.length < config.count) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      particlesRef.current.push(createParticle(centerX, centerY))
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [canvasRef, config, createParticle, updateParticle, drawParticle])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }, [canvasRef])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [canvasRef, handleResize, handleMouseMove, animate])

  return {
    particles: particlesRef.current,
    mouse: mouseRef.current,
  }
}
