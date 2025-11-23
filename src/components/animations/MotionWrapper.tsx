'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  className?: string
}

export function MotionWrapper({
  children,
  className,
  ...motionProps
}: MotionWrapperProps) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  )
}
