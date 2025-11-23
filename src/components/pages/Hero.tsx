'use client'

import { motion, useMotionValue, useTransform, useSpring, useScroll, useTransform as useTransformScroll } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { ParticleSystem } from '@/components/animations/ParticleSystem'
import { QuantumMorphing } from '@/components/animations/QuantumMorphing'
import { CountingNumber } from '@/components/ui/counting-number'
import { WordRotate } from '@/components/ui/word-rotate'
import { ShimmeringText } from '@/components/ui/shimmering-text'
import Aurora from '@/components/Aurora'
import { useTheme } from 'next-themes'

export function Hero() {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [2, -2])
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2])

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransformScroll(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransformScroll(scrollYProgress, [0, 0.3], [1, 0.95])

  // Parallax speeds based on your request
  const yTitle = useTransformScroll(scrollYProgress, [0, 1], [0, 100 * (1 - 0.8)]) // data-speed="0.8"
  const yButtons = useTransformScroll(scrollYProgress, [0, 1], [0, -100 * (1.2 - 1)]) // data-speed="1.2"
  const yStats = useTransformScroll(scrollYProgress, [0, 1], [0, -200 * (2.0 - 1)]) // data-speed="2.0"
  const yFeatures = useTransformScroll(scrollYProgress, [0, 1], [0, -300 * (1.2 - 1)]) // data-speed="1.2"

  return (
    <motion.div
      id="hero-section"
      ref={heroRef}
      className="hero-section h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        opacity,
        scale,
      }}
    >
      {mounted && theme === 'dark' && (
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={['#5227FF', '#7cff67', '#5227FF']}
            amplitude={1.0}
            blend={0.5}
            speed={0.5}
          />
        </div>
      )}
      <motion.div
        className="relative z-10 text-center container-max px-4 max-w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Sophisticated Title */}
        <motion.div
          className="mb-12" // data-speed="0.8"
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative inline-block">
          <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-4 text-neutral-900 dark:text-neutral-100"
            >
              OK Computer
            </motion.h1>
            {/* decorative underline removed per request - kept semantic container for future accents */}
          </div>
          <motion.div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Komponen PC
          </motion.div>
          <WordRotate
            words={['Performant', 'Cutting-Edge', 'Reliable', 'Customizable', 'Engineered']}
            animationStyle="fade"
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 mt-4"
            duration={1200}
            pauseDuration={500}
            loop={true}
          />
        </motion.div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light" // data-speed="1.2"
            style={{ y: yButtons }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Jual Komponen PC Terlengkap dan dengan Harga terjangkau di Indonesia
          </motion.p>

        {/* Sophisticated Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16" // data-speed="1.2"
          style={{ y: yButtons }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="group relative px-8 py-4 text-base font-semibold">
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-lg" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <span className="relative flex items-center gap-2">
                Explore Collection
                <motion.span initial={{ x: 0 }} animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="secondary" size="lg" className="px-8 py-4 text-base font-semibold">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 2a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h10a1 1 0 100-2H5zm0 4a1 1 0 000 2h6a1 1 0 100-2H5z" clipRule="evenodd" /></svg>
                Technical Specs
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Sophisticated Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16" // data-speed="2.0"
          style={{ y: yStats }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { label: 'Performance Rating', value: 99.9, suffix: '%', icon: '⚡' },
            { label: 'Product Range', value: 500, suffix: '+', icon: '🔧' },
            { label: 'Global Customers', value: 10, suffix: 'K+', icon: '🌍' },
            { label: 'Support Uptime', value: 24, suffix: '/7', icon: '🛡️' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-white/20 dark:bg-neutral-800/20 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-2">
                <CountingNumber from={0} to={stat.value} duration={3} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sophisticated Feature Showcase */}
        <motion.div
          className="w-full max-w-6xl mx-auto" // data-speed="1.2"
          style={{ y: yFeatures }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🚀', title: 'Next-Gen Performance', desc: 'Quantum-leap advancements in processing power and efficiency' },
              { icon: '🔒', title: 'Enterprise Security', desc: 'Military-grade encryption and tamper-proof designs' },
              { icon: '⚙️', title: 'Precision Engineering', desc: 'Nanometer-precision manufacturing for flawless operation' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center bg-white/10 dark:bg-neutral-800/10 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <ShimmeringText
                  text={feature.title}
                  className="text-lg font-bold mb-3"
                  duration={1.5}
                  repeatDelay={1 + index * 0.2}
                  tag="h3"
                />
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}
