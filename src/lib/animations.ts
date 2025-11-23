import { Variants } from 'framer-motion'


export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
}

export const glassMorph: Variants = {
  initial: { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(255, 255, 255, 0)' },
  animate: { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.05)' },
}

// Professional animations for big brand theme
export const magneticHover = {
  scale: 1.02,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  },
}

export const subtleGlow = {
  boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
  transition: {
    duration: 0.3,
  },
}

export const professionalSlide = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const elegantFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export const corporateHover = {
  y: -5,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
  },
}

export const brandAccent = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: { duration: 0.3 },
}

export const professionalRipple = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Motion/react animations
export const enterAnimation = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.4,
    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
  },
}

export const ballStyle = {
  width: 100,
  height: 100,
  backgroundColor: "#dd00ee",
  borderRadius: "50%",
}
