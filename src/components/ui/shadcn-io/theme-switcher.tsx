'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThemeSwitcherProps {
  defaultValue?: 'light' | 'dark' | 'system'
  value?: 'light' | 'dark' | 'system'
  onChange?: (theme: 'light' | 'dark' | 'system') => void
  className?: string
}

export function ThemeSwitcher({
  defaultValue = 'system',
  value,
  onChange,
  className
}: ThemeSwitcherProps) {
  const [internalTheme, setInternalTheme] = useState<'light' | 'dark' | 'system'>(defaultValue)

  const currentTheme = value ?? internalTheme

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (currentTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(currentTheme)
    }

    // Save to localStorage
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  const handleChange = (theme: 'light' | 'dark' | 'system') => {
    setInternalTheme(theme)
    onChange?.(theme)
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <select
        value={currentTheme}
        onChange={(e) => handleChange(e.target.value as 'light' | 'dark' | 'system')}
        className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
