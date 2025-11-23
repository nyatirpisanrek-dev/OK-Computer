'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PCComponent, PCBuild, BuildComponent } from '@/lib/types'
import SpotlightCard from '@/components/SpotlightCard'
import Aurora from '@/components/Aurora'
import { useCart } from '@/contexts/CartContext'
import { CheckCircle, AlertTriangle, Save, ShoppingCart, Cpu, HardDrive, Monitor, Zap, Fan, CircuitBoard, Box, Power } from 'lucide-react'

// Mock data - replace with actual data fetching
const mockComponents: PCComponent[] = [
  // CPUs
  {
    id: 'cpu1',
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    price: 589,
    image: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24125939/intel_13900k_tomwarren.jpg?quality=90&strip=all&crop=0,0.22683084899546,100,99.546338302009',
    specs: { 'Cores': '24', 'Threads': '32', 'Socket': 'LGA 1700', 'TDP': '125W' },
    description: 'High-performance desktop processor',
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  {
    id: 'cpu2',
    name: 'AMD Ryzen 9 7950X',
    category: 'CPU',
    price: 699,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSccbPN4H-LqduLQWXGni0eiik6B8TokT0R7g&s',
    specs: { 'Cores': '16', 'Threads': '32', 'Socket': 'AM5', 'TDP': '170W' },
    description: 'The ultimate processor for gaming and content creation.',
    inStock: true,
    rating: 4.9,
    reviews: 1150,
  },
  // GPUs
  {
    id: 'gpu1',
    name: 'RTX 4090 Graphics Card',
    category: 'GPU',
    price: 1599,
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4090/geforce-ada-4090-web-og-1200x630.jpg',
    specs: { 'CUDA Cores': '16384', 'Memory': '24GB GDDR6X', 'TDP': '450W' },
    description: 'Ultimate gaming and creative performance',
    inStock: true,
    rating: 4.9,
    reviews: 1247,
  },
  {
    id: 'gpu2',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'GPU',
    price: 999,
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/110/MTA-167369951/br-m036969-00220_vga-asus-amd-radeon-rx-7900-xtx-tuf-gaming-oc-24gb-gddr6_full05-8616462f.jpg',
    specs: { 'Stream Processors': '6144', 'Memory': '24GB GDDR6', 'TDP': '355W' },
    description: 'Exceptional 4K gaming performance and value.',
    inStock: true,
    rating: 4.8,
    reviews: 810,
  },
  // Motherboards
  {
    id: 'mb1',
    name: 'ASUS ROG Strix Z690-E',
    category: 'Motherboard',
    price: 449,
    image: 'https://img.olx.com.br/images/39/390417569291274.jpg',
    specs: { 'Socket': 'LGA 1700', 'Chipset': 'Intel Z690', 'Form Factor': 'ATX' },
    description: 'Gaming motherboard with advanced features',
    inStock: true,
    rating: 4.7,
    reviews: 678,
  },
  {
    id: 'mb2',
    name: 'MSI B650 Tomahawk',
    category: 'Motherboard',
    price: 299,
    image: 'https://www.msi.com/asset/image/2023/08/20230823_MSI_B650_Tomahawk_WiFi_Black_01.png',
    specs: { 'Socket': 'AM5', 'Chipset': 'AMD B650', 'Form Factor': 'ATX' },
    description: 'Reliable motherboard for AMD processors',
    inStock: true,
    rating: 4.6,
    reviews: 543,
  },
  // RAM
  {
    id: 'ram1',
    name: 'Corsair Vengeance RGB Pro',
    category: 'RAM',
    price: 149,
    image: 'https://images-cdn.ubuy.co.id/64922de997629814147af128-corsair-vengeance-rgb-ddr5-ram-32gb.jpg',
    specs: { 'Capacity': '32GB', 'Speed': '3600MHz', 'Type': 'DDR4' },
    description: 'High-performance RGB memory with aluminum heatspreader',
    inStock: true,
    rating: 4.7,
    reviews: 543,
  },
  // Storage
  {
    id: 'ssd1',
    name: 'Samsung 980 PRO SSD',
    category: 'Storage',
    price: 199,
    image: 'https://cdn.mos.cms.futurecdn.net/SB7pjJLnDjgjXGDtue8nnh.jpg',
    specs: { 'Capacity': '1TB', 'Interface': 'PCIe 4.0', 'Form Factor': 'M.2' },
    description: 'Professional NVMe SSD for ultimate performance',
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  // PSU
  {
    id: 'psu1',
    name: 'SeaSonic PRIME TX-1000',
    category: 'PSU',
    price: 329,
    image: 'https://images-cdn.ubuy.co.id/66162598dfda3131aa544edd-seasonic-1000w-prime-tx-1000-power.jpg',
    specs: { 'Wattage': '1000W', 'Rating': '80+ Titanium', 'Modular': 'Full' },
    description: 'Top-tier performance and reliability for high-end systems.',
    inStock: true,
    rating: 4.9,
    reviews: 720,
  },
  // Case
  {
    id: 'case1',
    name: 'Lian Li PC-O11 Dynamic EVO',
    category: 'Case',
    price: 169,
    image: 'https://tpucdn.com/review/lian-li-o11-dynamic-evo-xl/images/title.jpg',
    specs: { 'Type': 'Mid Tower', 'Material': 'Aluminum, Tempered Glass' },
    description: 'A versatile and stunning case for any build.',
    inStock: true,
    rating: 4.9,
    reviews: 1300,
  },
  // Cooling
  {
    id: 'cooler1',
    name: 'NZXT Kraken X73',
    category: 'Cooling',
    price: 179,
    image: 'https://m.media-amazon.com/images/I/51mI4+bquhL._AC_UF1000,1000_QL80_.jpg',
    specs: { 'Radiator': '360mm', 'Fans': '3x 140mm', 'Type': 'AIO' },
    description: 'Premium liquid cooling with LCD display',
    inStock: true,
    rating: 4.6,
    reviews: 321,
  },
]

const buildCategories = [
  { id: 'CPU', name: 'Processor', icon: Cpu, required: true },
  { id: 'Motherboard', name: 'Motherboard', icon: CircuitBoard, required: true },
  { id: 'GPU', name: 'Graphics Card', icon: Monitor, required: false },
  { id: 'RAM', name: 'Memory', icon: HardDrive, required: true },
  { id: 'Storage', name: 'Storage', icon: HardDrive, required: true },
  { id: 'PSU', name: 'Power Supply', icon: Zap, required: true },
  { id: 'Case', name: 'Case', icon: Box, required: true },
  { id: 'Cooling', name: 'Cooling', icon: Fan, required: false },
]

export function BuildConfigurator() {
  const [build, setBuild] = useState<PCBuild>({
    id: '',
    name: 'My Custom Build',
    components: {},
    totalPrice: 0,
    compatible: true,
    saved: false,
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('CPU')
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([])
  const { addItem } = useCart()

  // Compatibility rules
  const checkCompatibility = useCallback((components: Record<string, PCComponent>) => {
    const issues: string[] = []

    // CPU-Motherboard socket compatibility
    if (components.CPU && components.Motherboard) {
      const cpuSocket = components.CPU.specs.Socket
      const mbSocket = components.Motherboard.specs.Socket
      if (cpuSocket !== mbSocket) {
        issues.push(`CPU socket (${cpuSocket}) doesn't match motherboard socket (${mbSocket})`)
      }
    }

    // PSU wattage check (rough estimate)
    const totalTDP = Object.values(components).reduce((sum, comp) => {
      const tdp = parseInt(comp.specs.TDP?.replace('W', '') || '0')
      return sum + tdp
    }, 0)

    if (components.PSU) {
      const psuWattage = parseInt(components.PSU.specs.Wattage?.replace('W', '') || '0')
      if (totalTDP > psuWattage * 0.8) { // 80% rule
        issues.push(`PSU wattage (${psuWattage}W) may be insufficient for total TDP (${totalTDP}W)`)
      }
    }

    // RAM type compatibility (simplified)
    if (components.RAM && components.Motherboard) {
      const ramType = components.RAM.specs.Type
      // Assume DDR4 for Intel Z690, DDR5 for newer
      if (components.Motherboard.specs.Socket === 'LGA 1700' && ramType !== 'DDR4' && ramType !== 'DDR5') {
        issues.push('RAM type may not be compatible with motherboard')
      }
    }

    setCompatibilityIssues(issues)
    return issues.length === 0
  }, [])

  // Calculate total price
  const calculateTotal = useCallback((components: Record<string, PCComponent>) => {
    return Object.values(components).reduce((sum, comp) => sum + comp.price, 0)
  }, [])

  // Update build when components change
  useEffect(() => {
    const totalPrice = calculateTotal(build.components)
    const compatible = checkCompatibility(build.components)
    setBuild((prev: PCBuild) => ({ ...prev, totalPrice, compatible }))
  }, [build.components, calculateTotal, checkCompatibility])

  // Select component for category
  const selectComponent = (category: string, component: PCComponent) => {
    setBuild(prev => ({
      ...prev,
      components: { ...prev.components, [category]: component }
    }))
  }

  // Remove component
  const removeComponent = (category: string) => {
    setBuild(prev => {
      const newComponents = { ...prev.components }
      delete newComponents[category]
      return { ...prev, components: newComponents }
    })
  }

  // Save build to localStorage
  const saveBuild = useCallback(() => {
    const builds = JSON.parse(localStorage.getItem('savedBuilds') || '[]')
    const buildToSave = { ...build, id: build.id || Date.now().toString(), saved: true }
    const existingIndex = builds.findIndex((b: PCBuild) => b.id === build.id)
    if (existingIndex >= 0) {
      builds[existingIndex] = buildToSave
    } else {
      builds.push(buildToSave)
    }
    localStorage.setItem('savedBuilds', JSON.stringify(builds))
    setBuild(buildToSave)
  }, [build])

  // Add build to cart
  const addBuildToCart = useCallback(() => {
    Object.values(build.components).forEach((component: PCComponent) => {
      addItem(component)
    })
  }, [build.components, addItem])

  const filteredComponents = mockComponents.filter(comp => comp.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="absolute inset-0 opacity-30">
        <Aurora />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
            PC Build Configurator
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Build your perfect gaming rig with our intelligent compatibility system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Categories */}
          <div className="lg:col-span-1">
            <SpotlightCard className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-neutral-100">Components</h2>
              <div className="space-y-3">
                {buildCategories.map((category) => {
                  const Icon = category.icon
                  const selected = build.components[category.id]
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-neutral-600 hover:border-primary-400'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-primary-400" />
                          <div className="text-left">
                            <div className="font-semibold text-neutral-100">{category.name}</div>
                            {selected && (
                              <div className="text-sm text-neutral-400">{selected.name}</div>
                            )}
                          </div>
                        </div>
                        {selected && (
                          <CheckCircle className="w-5 h-5 text-success-500" />
                        )}
                        {category.required && !selected && (
                          <AlertTriangle className="w-5 h-5 text-warning-500" />
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </SpotlightCard>
          </div>

          {/* Component Selection */}
          <div className="lg:col-span-2">
            <SpotlightCard className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-neutral-100">
                Select {buildCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredComponents.map((component) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        build.components[selectedCategory]?.id === component.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-neutral-600 hover:border-primary-400'
                      }`}
                      onClick={() => selectComponent(selectedCategory, component)}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={component.image}
                          alt={component.name}
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-100">{component.name}</h3>
                          <p className="text-sm text-neutral-400 mb-2">{component.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
                              <span key={key} className="text-xs bg-neutral-700 px-2 py-1 rounded">
                                {key}: {value}
                              </span>
                            ))}
                          </div>
                          <div className="font-bold text-primary-400">${component.price}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Build Summary */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Compatibility Issues */}
          {compatibilityIssues.length > 0 && (
            <SpotlightCard className="p-6 border-warning-500/50">
              <h3 className="text-xl font-bold mb-4 text-warning-400 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Compatibility Issues
              </h3>
              <ul className="space-y-2">
                {compatibilityIssues.map((issue, index) => (
                  <li key={index} className="text-neutral-300 flex items-start gap-2">
                    <span className="text-warning-400 mt-1">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          )}

          {/* Build Summary */}
          <SpotlightCard className="p-6">
            <h3 className="text-xl font-bold mb-4 text-neutral-100">Build Summary</h3>
            <div className="space-y-3 mb-6">
              {Object.entries(build.components).map(([category, component]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">{category}:</span>
                    <span className="text-neutral-100">{(component as PCComponent).name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">${(component as PCComponent).price}</span>
                    <button
                      onClick={() => removeComponent(category)}
                      className="text-neutral-400 hover:text-error-400"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-600 pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-neutral-100">Total:</span>
                <span className="text-primary-400">${build.totalPrice}</span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={saveBuild}
            className="px-8 py-3"
            disabled={!build.compatible}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Build
          </Button>
          <Button
            onClick={addBuildToCart}
            className="px-8 py-3"
            disabled={!build.compatible || Object.keys(build.components).length === 0}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
