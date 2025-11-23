'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  hover?: boolean
  variant?: 'default' | 'elevated' | 'glass'
  children: React.ReactNode
  className?: string
}

export function Card({
  children,
  className,
  hover = true,
  variant = 'default',
}: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'shadow-elegant hover:shadow-professional'
      case 'glass':
        return 'glass-card shadow-professional'
      default:
        return 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-professional'
    }
  }

  return (
    <motion.div
      className={cn(
        'rounded-xl p-6 transition-all duration-500 relative overflow-hidden',
        getVariantClasses(),
        hover && 'hover:shadow-elegant hover:-translate-y-1',
        className
      )}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
