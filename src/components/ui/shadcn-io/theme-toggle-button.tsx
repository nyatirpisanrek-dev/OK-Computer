'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark'
  onClick: () => void
  variant?: 'circle-blur' | 'square' | 'minimal'
  start?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export function ThemeToggleButton({
  theme,
  onClick,
  variant = 'circle-blur',
  start = 'top-right',
  className
}: ThemeToggleButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = useCallback(() => {
    setIsAnimating(true)
    onClick()
    setTimeout(() => setIsAnimating(false), 600)
  }, [onClick])

  const getStartPosition = () => {
    switch (start) {
      case 'top-left':
        return { top: 8, left: 8 }
      case 'top-right':
        return { top: 8, right: 8 }
      case 'bottom-left':
        return { bottom: 8, left: 8 }
      case 'bottom-right':
        return { bottom: 8, right: 8 }
      default:
        return { top: 8, right: 8 }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'circle-blur':
        return {
          button: 'relative w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-visible',
          icon: 'w-5 h-5 text-neutral-600 dark:text-neutral-400',
          animation: {
            initial: { scale: 0, opacity: 0.8 },
            animate: { scale: 4, opacity: 0 },
            exit: { scale: 0, opacity: 0 },
            transition: { duration: 0.6, ease: 'easeOut' }
          }
        }
      case 'square':
        return {
          button: 'relative w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
          icon: 'w-4 h-4 text-neutral-600 dark:text-neutral-400',
          animation: {
            initial: { scale: 0, opacity: 0.8 },
            animate: { scale: 3, opacity: 0 },
            exit: { scale: 0, opacity: 0 },
            transition: { duration: 0.5, ease: 'easeOut' }
          }
        }
      case 'minimal':
        return {
          button: 'relative w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
          icon: 'w-3 h-3 text-neutral-600 dark:text-neutral-400',
          animation: {
            initial: { scale: 0, opacity: 0.8 },
            animate: { scale: 2, opacity: 0 },
            exit: { scale: 0, opacity: 0 },
            transition: { duration: 0.4, ease: 'easeOut' }
          }
        }
      default:
        return {
          button: 'relative w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden',
          icon: 'w-5 h-5 text-neutral-600 dark:text-neutral-400',
          animation: {
            initial: { scale: 0, opacity: 0.8 },
            animate: { scale: 4, opacity: 0 },
            exit: { scale: 0, opacity: 0 },
            transition: { duration: 0.6, ease: 'easeOut' }
          }
        }
    }
  }

  const styles = getVariantStyles()
  const startPos = getStartPosition()

  return (
    <button
      onClick={handleClick}
      className={cn(styles.button, className)}
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-sm"
            style={startPos}
            initial={styles.animation.initial}
            animate={styles.animation.animate}
            exit={styles.animation.exit}
            transition={styles.animation.transition}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.icon}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.icon}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}

export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback((callback: () => void) => {
    setIsTransitioning(true)
    callback()
    setTimeout(() => setIsTransitioning(false), 600)
  }, [])

  return { startTransition, isTransitioning }
}
