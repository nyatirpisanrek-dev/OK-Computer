'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WordRotateProps {
  words: string[]
  animationStyle?: 'fade' | 'slide-up' | 'slide-down'
  duration?: number
  pauseDuration?: number
  loop?: boolean
  className?: string
}

export function WordRotate({
  words,
  animationStyle = 'fade',
  duration = 1000,
  pauseDuration = 1500,
  loop = true,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        if (newIndex >= words.length) {
          return loop ? 0 : prevIndex
        }
        return newIndex
      })
    }, duration + pauseDuration)

    return () => clearInterval(interval)
  }, [words, duration, pauseDuration, loop])

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          initial={{ opacity: 0, y: animationStyle === 'slide-up' ? 20 : animationStyle === 'slide-down' ? -20 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: animationStyle === 'slide-up' ? -20 : animationStyle === 'slide-down' ? 20 : 0 }}
          transition={{ duration: duration / 2000, ease: 'easeInOut' }}
          className={cn(className)}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}