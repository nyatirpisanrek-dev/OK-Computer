'use client'

import { useEffect, useRef, useCallback } from 'react'

interface QuantumState {
  position: { x: number; y: number }
  momentum: { x: number; y: number }
  energy: number
  phase: number
  superposition: Array<{ amplitude: number; phase: number }>
}

interface QuantumConfig {
  states: number
  entanglement: number
  decoherence: number
  tunneling: number
  observer: { x: number; y: number }
}

export function useQuantumMorphing(
  elementRef: React.RefObject<HTMLElement>,
  config: QuantumConfig
) {
  const quantumStatesRef = useRef<QuantumState[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const initializeQuantumStates = useCallback(() => {
    quantumStatesRef.current = Array.from({ length: config.states }, (_, i) => ({
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      momentum: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      energy: Math.random() * 100,
      phase: Math.random() * Math.PI * 2,
      superposition: Array.from({ length: 3 }, () => ({
        amplitude: Math.random(),
        phase: Math.random() * Math.PI * 2,
      })),
    }))
  }, [config.states])

  const calculateWaveFunction = useCallback((state: QuantumState, time: number) => {
    const waveFunction = state.superposition.reduce((sum, component, index) => {
      const frequency = (index + 1) * 0.1
      const amplitude = component.amplitude * Math.exp(-time * config.decoherence)
      const phase = component.phase + frequency * time + state.phase
      return sum + amplitude * Math.cos(phase)
    }, 0)

    return waveFunction
  }, [config.decoherence])

  const applyQuantumEntanglement = useCallback((states: QuantumState[]) => {
    for (let i = 0; i < states.length; i++) {
      for (let j = i + 1; j < states.length; j++) {
        const dx = states[j].position.x - states[i].position.x
        const dy = states[j].position.y - states[i].position.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = config.entanglement / (distance * distance + 1)
          const fx = (dx / distance) * force
          const fy = (dy / distance) * force

          states[i].momentum.x += fx * 0.01
          states[i].momentum.y += fy * 0.01
          states[j].momentum.x -= fx * 0.01
          states[j].momentum.y -= fy * 0.01
        }
      }
    }
  }, [config.entanglement])

  const applyQuantumTunneling = useCallback((state: QuantumState) => {
    const observerDistance = Math.sqrt(
      Math.pow(state.position.x - config.observer.x, 2) +
      Math.pow(state.position.y - config.observer.y, 2)
    )

    if (observerDistance < 50 && Math.random() < config.tunneling) {
      // Quantum tunneling effect
      state.position.x += (Math.random() - 0.5) * 200
      state.position.y += (Math.random() - 0.5) * 200
      state.energy *= 0.8 // Energy loss during tunneling
    }
  }, [config.observer, config.tunneling])

  const updateQuantumState = useCallback((state: QuantumState, deltaTime: number) => {
    const waveFunction = calculateWaveFunction(state, timeRef.current)

    // Update phase
    state.phase += deltaTime * 2

    // Apply quantum uncertainty principle
    const uncertainty = Math.sqrt(Math.abs(state.energy)) * 0.1
    state.momentum.x += (Math.random() - 0.5) * uncertainty
    state.momentum.y += (Math.random() - 0.5) * uncertainty

    // Update position with wave function influence
    state.position.x += state.momentum.x * deltaTime + waveFunction * Math.sin(timeRef.current) * 0.5
    state.position.y += state.momentum.y * deltaTime + waveFunction * Math.cos(timeRef.current) * 0.5

    // Boundary conditions with quantum reflection
    if (state.position.x < 0 || state.position.x > window.innerWidth) {
      state.momentum.x *= -0.9
      state.position.x = Math.max(0, Math.min(window.innerWidth, state.position.x))
    }
    if (state.position.y < 0 || state.position.y > window.innerHeight) {
      state.momentum.y *= -0.9
      state.position.y = Math.max(0, Math.min(window.innerHeight, state.position.y))
    }

    // Apply quantum effects
    applyQuantumTunneling(state)

    // Energy conservation with quantum fluctuations
    state.energy += (Math.random() - 0.5) * 0.1
    state.energy = Math.max(0, Math.min(100, state.energy))
  }, [calculateWaveFunction, applyQuantumTunneling])

  const applyMorphingEffect = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const states = quantumStatesRef.current
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    // Calculate collective quantum field
    const fieldStrength = states.reduce((sum, state) => {
      const distance = Math.sqrt(
        Math.pow(state.position.x - centerX, 2) +
        Math.pow(state.position.y - centerY, 2)
      )
      return sum + calculateWaveFunction(state, timeRef.current) / (distance + 1)
    }, 0) / states.length

    // Apply morphing transformations
    const scale = 1 + fieldStrength * 0.1
    const rotation = fieldStrength * 10
    const skew = fieldStrength * 5

    element.style.transform = `
      scale(${scale})
      rotate(${rotation}deg)
      skew(${skew}deg, ${skew}deg)
    `

    // Apply quantum color shifting
    const hue = (fieldStrength * 360 + timeRef.current * 50) % 360
    element.style.filter = `
      hue-rotate(${hue}deg)
      brightness(${1 + fieldStrength * 0.5})
      contrast(${1 + fieldStrength * 0.3})
      saturate(${1 + fieldStrength * 0.8})
    `
  }, [elementRef, calculateWaveFunction])

  const animate = useCallback(() => {
    timeRef.current += 0.016
    const deltaTime = 0.016

    const states = quantumStatesRef.current

    // Update all quantum states
    states.forEach(state => updateQuantumState(state, deltaTime))

    // Apply quantum entanglement
    applyQuantumEntanglement(states)

    // Apply morphing effect
    applyMorphingEffect()

    animationRef.current = requestAnimationFrame(animate)
  }, [updateQuantumState, applyQuantumEntanglement, applyMorphingEffect])

  useEffect(() => {
    initializeQuantumStates()
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeQuantumStates, animate])

  return {
    quantumStates: quantumStatesRef.current,
    time: timeRef.current,
  }
}
