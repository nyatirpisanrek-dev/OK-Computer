'use client'

import { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.8)
    }
  }, [])

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  )
}
