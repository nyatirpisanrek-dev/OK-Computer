'use client'

import { motion } from 'framer-motion'

export function CircuitTree() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.2
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      }
    },
  }

  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      initial="hidden"
      animate="visible"
      className="absolute bottom-28 left-1/2 -translate-x-1/2 text-primary-400/30 dark:text-primary-300/20"
    >
      {/* Trunk */}
      <motion.line
        x1="60"
        y1="120"
        x2="60"
        y2="90"
        stroke="currentColor"
        strokeWidth={2}
        variants={draw}
        custom={0}
      />
      <motion.circle cx="60" cy="120" r="3" fill="currentColor" variants={draw} custom={0} />

      {/* Level 1 Branches */}
      <motion.line x1="60" y1="90" x2="40" y2="70" stroke="currentColor" strokeWidth={2} variants={draw} custom={1} />
      <motion.line x1="60" y1="90" x2="80" y2="70" stroke="currentColor" strokeWidth={2} variants={draw} custom={1.1} />
      <motion.circle cx="60" cy="90" r="2.5" fill="currentColor" variants={draw} custom={0.5} />

      {/* Level 2 Branches */}
      <motion.line x1="40" y1="70" x2="30" y2="50" stroke="currentColor" strokeWidth={1.5} variants={draw} custom={1.5} />
      <motion.line x1="40" y1="70" x2="50" y2="55" stroke="currentColor" strokeWidth={1.5} variants={draw} custom={1.6} />
      <motion.circle cx="40" cy="70" r="2" fill="currentColor" variants={draw} custom={1.2} />

      <motion.line x1="80" y1="70" x2="70" y2="55" stroke="currentColor" strokeWidth={1.5} variants={draw} custom={1.7} />
      <motion.line x1="80" y1="70" x2="90" y2="50" stroke="currentColor" strokeWidth={1.5} variants={draw} custom={1.8} />
      <motion.circle cx="80" cy="70" r="2" fill="currentColor" variants={draw} custom={1.3} />

      {/* Level 3 Branches (Leaves) */}
      <motion.line x1="30" y1="50" x2="25" y2="40" stroke="currentColor" strokeWidth={1} variants={draw} custom={2} />
      <motion.line x1="30" y1="50" x2="35" y2="40" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.1} />
      <motion.circle cx="30" cy="50" r="1.5" fill="currentColor" variants={draw} custom={1.9} />

      <motion.line x1="50" y1="55" x2="45" y2="45" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.2} />
      <motion.line x1="50" y1="55" x2="55" y2="45" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.3} />
      <motion.circle cx="50" cy="55" r="1.5" fill="currentColor" variants={draw} custom={2} />

      <motion.line x1="70" y1="55" x2="65" y2="45" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.4} />
      <motion.line x1="70" y1="55" x2="75" y2="45" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.5} />
      <motion.circle cx="70" cy="55" r="1.5" fill="currentColor" variants={draw} custom={2.1} />

      <motion.line x1="90" y1="50" x2="85" y2="40" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.6} />
      <motion.line x1="90" y1="50" x2="95" y2="40" stroke="currentColor" strokeWidth={1} variants={draw} custom={2.7} />
      <motion.circle cx="90" cy="50" r="1.5" fill="currentColor" variants={draw} custom={2.2} />

      {/* Top leaves */}
      <motion.circle cx="25" cy="40" r="1" fill="currentColor" variants={draw} custom={2.8} />
      <motion.circle cx="35" cy="40" r="1" fill="currentColor" variants={draw} custom={2.9} />
      <motion.circle cx="45" cy="45" r="1" fill="currentColor" variants={draw} custom={3} />
      <motion.circle cx="55" cy="45" r="1" fill="currentColor" variants={draw} custom={3.1} />
      <motion.circle cx="65" cy="45" r="1" fill="currentColor" variants={draw} custom={3.2} />
      <motion.circle cx="75" cy="45" r="1" fill="currentColor" variants={draw} custom={3.3} />
      <motion.circle cx="85" cy="40" r="1" fill="currentColor" variants={draw} custom={3.4} />
      <motion.circle cx="95" cy="40" r="1" fill="currentColor" variants={draw} custom={3.5} />
    </motion.svg>
  )
}