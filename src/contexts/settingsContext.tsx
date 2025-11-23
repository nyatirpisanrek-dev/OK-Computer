'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Mode = 'light' | 'dark' | 'system'

export interface ThemeStyles {
  light: Record<string, any>
  dark: Record<string, any>
}

export interface Theme {
  styles?: ThemeStyles
}

export interface Settings {
  mode: Mode
  theme: Theme
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (settings: Settings) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export { SettingsContext }

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    mode: 'system',
    theme: {
      styles: {
        light: {},
        dark: {}
      }
    }
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('settings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Failed to parse settings from localStorage:', error)
      }
    }
  }, [])

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings)
    localStorage.setItem('settings', JSON.stringify(newSettings))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
