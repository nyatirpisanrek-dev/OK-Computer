'use client'

import { useTheme } from 'next-themes'
import { useSettings } from '@/hooks/useSettings'
import type { Mode } from '@/contexts/settingsContext'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { useCallback, useEffect, useState } from 'react'

interface ThemeToggleProps {
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

export function ThemeToggle({ onTransitionStart, onTransitionEnd }: ThemeToggleProps) {
  const { setTheme } = useTheme()
  const { settings, updateSettings } = useSettings()

  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()

    // Start transition
    setIsTransitioning(true)
    onTransitionStart?.()

    // Immediately change the theme
    const newMode: Mode = settings.mode === 'dark' ? 'light' : 'dark'
    setTheme(newMode)
    const updatedSettings = {
      ...settings,
      mode: newMode,
      theme: {
        ...settings.theme,
        styles: {
          light: settings.theme.styles?.light || {},
          dark: settings.theme.styles?.dark || {}
        }
      }
    }
    updateSettings(updatedSettings)

    // Wait for animation to complete
    setTimeout(() => {
      setIsTransitioning(false)
      onTransitionEnd?.()
    }, 1200) // Match the longest animation duration
  }, [settings, setTheme, updateSettings, onTransitionStart, onTransitionEnd])

  const currentTheme = settings.mode === 'system' ? 'light' : settings.mode as 'light' | 'dark'

  if (!mounted) {
    return null
  }

  return (
    <div className="relative">
      <AnimatedThemeToggler
        onClick={handleThemeToggle}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/10 dark:bg-neutral-800/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-neutral-900/90 dark:bg-neutral-100/90 text-neutral-100 dark:text-neutral-900 text-xs rounded-lg opacity-0 hover:opacity-100 pointer-events-none whitespace-nowrap shadow-xl backdrop-blur-sm transition-opacity duration-200">
        {currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900/90 dark:border-t-neutral-100/90" />
      </div>
    </div>
  )
}
