'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface AnimatedGridPatternProps {
  numSquares?: number
  maxOpacity?: number
  duration?: number
  className?: string
}

export function AnimatedGridPattern({
  numSquares = 30,
  maxOpacity = 0.1,
  duration = 3,
  className,
}: AnimatedGridPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/30 dark:fill-neutral-500/20 [mask-image:radial-gradient(transparent,white_40%)]',
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width="72"
          height="56"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="50%"
          patternTransform="translate(-36 -28)"
        >
          <path d="M.5 56V.5H72" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <motion.svg
        width="100%"
        height="100%"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </motion.svg>
    </svg>
  )
}