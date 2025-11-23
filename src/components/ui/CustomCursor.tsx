'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Different spring configs for different elements
  const cursorSpringX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.5 })
  const cursorSpringY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.5 })
  const trailSpringX = useSpring(mouseX, { stiffness: 300, damping: 40, mass: 1 })
  const trailSpringY = useSpring(mouseY, { stiffness: 300, damping: 40, mass: 1 })

  useEffect(() => {
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) cancelAnimationFrame(animationFrame)

      animationFrame = requestAnimationFrame(() => {
        mouseX.set(e.clientX - 12) // Center the cursor
        mouseY.set(e.clientY - 12)
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], [onclick], [data-cursor-hover]')

      setIsHovering(isInteractive)
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Add global styles for interactive elements
    const style = document.createElement('style')
    style.textContent = `
      button, a, input, textarea, select, [role="button"], [onclick], [data-cursor-hover] {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementHover, true)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover, true)
      document.body.style.cursor = 'auto'
      document.head.removeChild(style)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Main Cursor - Compact Elegant Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998] shadow-2xl"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(147, 51, 234, 0.9))',
          backdropFilter: 'blur(1px)',
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          boxShadow: isHovering
            ? '0 0 25px rgba(59, 130, 246, 0.7), 0 0 50px rgba(59, 130, 246, 0.4)'
            : '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          mass: 0.6,
        }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
      />

      {/* Inner Glow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(59, 130, 246, 0.7))',
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.9 : 0.7,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.4,
        }}
      />
    </>
  )
}
