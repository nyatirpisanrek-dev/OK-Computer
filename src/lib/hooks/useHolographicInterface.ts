'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface HologramLayer {
  id: string
  zIndex: number
  opacity: number
  transform: string
  filter: string
  content: React.ReactNode
}

interface HolographicConfig {
  layers: number
  depth: number
  parallax: number
  distortion: number
  chromaticAberration: number
  scanlines: boolean
  flicker: boolean
}

export function useHolographicInterface<T extends HTMLElement | null = HTMLElement | null>(
  containerRef: React.RefObject<T>,
  config: HolographicConfig
) {
  const layersRef = useRef<HologramLayer[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  const createHologramLayers = useCallback(() => {
    layersRef.current = Array.from({ length: config.layers }, (_, i) => ({
      id: `hologram-layer-${i}`,
      zIndex: i + 1,
      opacity: 1 - (i / config.layers) * 0.3,
      transform: '',
      filter: '',
      content: null,
    }))
  }, [config.layers])

  const calculateParallaxOffset = useCallback((layerIndex: number, mouseX: number, mouseY: number) => {
    const depth = (layerIndex + 1) / config.layers
    const parallaxX = (mouseX - window.innerWidth / 2) * config.parallax * depth * 0.01
    const parallaxY = (mouseY - window.innerHeight / 2) * config.parallax * depth * 0.01
    return { x: parallaxX, y: parallaxY }
  }, [config.parallax, config.layers])

  const applyHolographicEffects = useCallback((layer: HologramLayer, index: number, time: number) => {
    const mouse = mouseRef.current
    const parallax = calculateParallaxOffset(index, mouse.x, mouse.y)

    // Base transform with parallax
    let transform = `translate(${parallax.x}px, ${parallax.y}px)`

    // Add depth scaling
    const depthScale = 1 + (index / config.layers) * config.depth * 0.1
    transform += ` scale(${depthScale})`

    // Add subtle rotation based on mouse position
    const rotationX = (mouse.y - window.innerHeight / 2) * 0.01 * (index + 1)
    const rotationY = (mouse.x - window.innerWidth / 2) * 0.01 * (index + 1)
    transform += ` rotateX(${rotationX}deg) rotateY(${rotationY}deg)`

    // Chromatic aberration
    const aberration = config.chromaticAberration * (index + 1) * 0.1
    const redOffset = aberration * Math.sin(time + index)
    const blueOffset = aberration * Math.cos(time + index)

    // Distortion effect
    const distortion = config.distortion * Math.sin(time * 2 + index * 0.5) * 0.01
    transform += ` skew(${distortion}deg, ${distortion}deg)`

    // Build filter string
    let filter = `hue-rotate(${time * 10 + index * 30}deg)`

    if (config.chromaticAberration > 0) {
      filter += ` drop-shadow(${redOffset}px 0 0 rgba(255, 0, 0, 0.5))`
      filter += ` drop-shadow(${-blueOffset}px 0 0 rgba(0, 0, 255, 0.5))`
    }

    // Add scanlines effect
    if (config.scanlines) {
      const scanlineOpacity = 0.1 + 0.1 * Math.sin(time * 50 + index * 10)
      filter += ` opacity(${1 - scanlineOpacity})`
    }

    // Add flicker effect
    if (config.flicker) {
      const flicker = 0.9 + 0.1 * Math.sin(time * 100 + index * 20)
      filter += ` brightness(${flicker})`
    }

    // Add holographic glow
    filter += ` drop-shadow(0 0 ${10 + index * 5}px rgba(0, 255, 136, ${0.3 - index * 0.1}))`

    layer.transform = transform
    layer.filter = filter
  }, [config, calculateParallaxOffset])

  const updateHolographicInterface = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    timeRef.current += 0.016
    const time = timeRef.current

    layersRef.current.forEach((layer, index) => {
      applyHolographicEffects(layer, index, time)

      // Apply styles to corresponding DOM element
      const element = container.querySelector(`[data-hologram-layer="${layer.id}"]`) as HTMLElement
      if (element) {
        element.style.transform = layer.transform
        element.style.filter = layer.filter
        element.style.opacity = layer.opacity.toString()
        element.style.zIndex = layer.zIndex.toString()
      }
    })
  }, [containerRef, applyHolographicEffects])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current = { x: event.clientX, y: event.clientY }
  }, [])

  const animate = useCallback(() => {
    updateHolographicInterface()
    requestAnimationFrame(animate)
  }, [updateHolographicInterface])

  useEffect(() => {
    createHologramLayers()
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [createHologramLayers, handleMouseMove, animate])

  const renderHologramLayer = useCallback((content: React.ReactNode, index: number): React.ReactElement | null => {
    const layer = layersRef.current[index]
    if (!layer) return null

    return React.createElement(
      'div',
      {
        key: layer.id,
        'data-hologram-layer': layer.id,
        className: 'absolute inset-0 pointer-events-none',
        style: {
          transform: layer.transform,
          filter: layer.filter,
          opacity: layer.opacity,
          zIndex: layer.zIndex,
        },
      },
      content
    )
  }, [])

  return {
    renderHologramLayer,
    layers: layersRef.current,
  }
}
