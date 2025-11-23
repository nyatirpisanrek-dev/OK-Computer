'use client'

import { ThemeProvider } from 'next-themes'
import { SettingsProvider } from '@/contexts/settingsContext'
import { CartProvider } from '@/contexts/CartContext'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { GreatNavbar } from '@/components/ui/GreatNavbar'
import { Cart } from '@/components/Cart'
import '@/styles/view-transitions.css'
import { useEffect, useState } from 'react'
import * as React from 'react';
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import ErrorBoundary from '@/components/ErrorBoundary'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--expo-out', 'cubic-bezier(0.16, 1, 0.3, 1)')

    // Listen for theme transition events from navbar
    const handleTransitionStart = () => setIsTransitioning(true)
    const handleTransitionEnd = () => setIsTransitioning(false)

    window.addEventListener('themeTransitionStart', handleTransitionStart)
    window.addEventListener('themeTransitionEnd', handleTransitionEnd)

    return () => {
      window.removeEventListener('themeTransitionStart', handleTransitionStart)
      window.removeEventListener('themeTransitionEnd', handleTransitionEnd)
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SettingsProvider>
        <CartProvider>
          <CustomCursor />
          <GreatNavbar />
          <div className="min-h-screen flex flex-col dark:bg-neutral-900">
            <ErrorBoundary>
              <main className="flex-1 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
                {children}
              </main>
            </ErrorBoundary>
            <BackToTopButton />
          </div>
          <Cart />
        </CartProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}
