'use client'

import { motion } from 'framer-motion'

export default function EnterAnimation() {
    return (
        <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                scale: { type: "spring", visualDuration: 0.8, bounce: 0.3 },
            }}
        >
            {/* Outer Glass Ring */}
            <motion.div
                className="absolute w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/20 backdrop-blur-xl border border-white/30 rounded-full shadow-2xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Inner Glass Orb */}
            <motion.div
                className="w-20 h-20 bg-gradient-to-br from-white/30 to-primary-500/30 backdrop-blur-2xl border border-white/40 rounded-full shadow-xl flex items-center justify-center"
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Center Glow */}
                <motion.div
                    className="w-8 h-8 bg-primary-500 rounded-full shadow-lg"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                            '0 0 40px rgba(59, 130, 246, 0.8)',
                            '0 0 20px rgba(59, 130, 246, 0.5)',
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-400/60 rounded-full"
                    style={{
                        top: `${20 + i * 10}%`,
                        left: `${20 + i * 10}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                    }}
                />
            ))}
        </motion.div>
    )
}
