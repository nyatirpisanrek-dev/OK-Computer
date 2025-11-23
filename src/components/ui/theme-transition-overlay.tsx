'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface ThemeTransitionOverlayProps {
  isTransitioning: boolean
}

export function ThemeTransitionOverlay({ isTransitioning }: ThemeTransitionOverlayProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Expanding Blur Circle from Top Left */}
          <motion.div
            className="absolute top-0 left-0 rounded-full"
            style={{
              backgroundColor: isDark ? '#1f2937' : '#f9fafb',
              filter: 'blur(20px)',
            }}
            initial={{
              width: 0,
              height: 0,
            }}
            animate={{
              width: '200vw',
              height: '200vw',
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
