'use client'

import { useState, useEffect, useId, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/ui/Button'
import { PCComponent, FilterOptions } from '@/lib/types'
import { staggerContainer, fadeInUp, magneticHover, subtleGlow, professionalRipple } from '@/lib/animations'
import { useParallax } from '@/lib/hooks/useMotion'
import { HolographicInterface } from '@/components/animations/HolographicInterface'
import { QuantumMorphing } from '@/components/animations/QuantumMorphing'
import PaginationDemo from '@/components/ui/PaginationDemo'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock data - replace with actual data fetching
const mockComponents: PCComponent[] = [
  {
    id: '1',
    name: 'RTX 4090 Graphics Card',
    category: 'GPU',
    price: 1599,
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4090/geforce-ada-4090-web-og-1200x630.jpg',
    specs: { 'CUDA Cores': '16384', 'Memory': '24GB GDDR6X' },
    description: 'Ultimate gaming and creative performance',
    inStock: true,
    rating: 4.9,
    reviews: 1247,
  },
  {
    id: '2',
    name: 'Intel Core i9-13900K',
    category: 'CPU',
    price: 589,
    image: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24125939/intel_13900k_tomwarren.jpg?quality=90&strip=all&crop=0,0.22683084899546,100,99.546338302009',
    specs: { 'Cores': '24', 'Threads': '32', 'Base Clock': '3.0GHz' },
    description: 'High-performance desktop processor',
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  {
    id: '3',
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
  {
    id: '4',
    name: 'Samsung 980 PRO SSD',
    category: 'Storage',
    price: 199,
    image: 'https://cdn.mos.cms.futurecdn.net/SB7pjJLnDjgjXGDtue8nnh.jpg',
    specs: { 'Capacity': '1TB', 'Interface': 'PCIe 4.0', 'Read Speed': '7000MB/s' },
    description: 'Professional NVMe SSD for ultimate performance',
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  {
    id: '5',
    name: 'NZXT Kraken X73',
    category: 'Cooling',
    price: 179,
    image: 'https://m.media-amazon.com/images/I/51mI4+bquhL._AC_UF1000,1000_QL80_.jpg',
    specs: { 'Radiator': '360mm', 'Fans': '3x 140mm', 'Pump': '4000RPM' },
    description: 'Premium liquid cooling with LCD display',
    inStock: true,
    rating: 4.6,
    reviews: 321,
  },
  {
    id: '6',
    name: 'ASUS ROG Strix Z690-E',
    category: 'Motherboard',
    price: 449,
    image: 'https://img.olx.com.br/images/39/390417569291274.jpg',
    specs: { 'Socket': 'LGA 1700', 'Chipset': 'Intel Z690', 'WiFi': 'WiFi 6E' },
    description: 'Gaming motherboard with advanced features',
    inStock: true,
    rating: 4.7,
    reviews: 678,
  },
  {
    id: '7',
    name: 'AMD Ryzen 9 7950X',
    category: 'CPU',
    price: 699,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSccbPN4H-LqduLQWXGni0eiik6B8TokT0R7g&s',
    specs: { 'Cores': '16', 'Threads': '32', 'Boost Clock': '5.7GHz' },
    description: 'The ultimate processor for gaming and content creation.',
    inStock: true,
    rating: 4.9,
    reviews: 1150,
  },
  {
    id: '8',
    name: 'G.Skill Trident Z5 RGB',
    category: 'RAM',
    price: 210,
    image: 'https://www.gskill.com/_upload/images/2110201626450.png',
    specs: { 'Capacity': '32GB', 'Speed': '6000MHz', 'Type': 'DDR5' },
    description: 'Extreme performance DDR5 memory with sleek design.',
    inStock: true,
    rating: 4.8,
    reviews: 480,
  },
  {
    id: '9',
    name: 'WD Black SN850X',
    category: 'Storage',
    price: 159,
    image: 'https://www.techpowerup.com/img/6t9iADwmsq1N3DzJ.jpg',
    specs: { 'Capacity': '2TB', 'Interface': 'PCIe 4.0', 'Read Speed': '7300MB/s' },
    description: 'Get the ultimate gaming edge with this high-speed NVMe SSD.',
    inStock: false,
    rating: 4.9,
    reviews: 950,
  },
  {
    id: '10',
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
  {
    id: '11',
    name: 'SeaSonic PRIME TX-1000',
    category: 'PSU',
    price: 329,
    image: 'https://images-cdn.ubuy.co.id/66162598dfda3131aa544edd-seasonic-1000w-prime-tx-1000-power.jpg',
    specs: { 'Wattage': '1000W', 'Rating': '80+ Titanium', 'Type': 'Modular' },
    description: 'Top-tier performance and reliability for high-end systems.',
    inStock: true,
    rating: 4.9,
    reviews: 720,
  },
  {
    id: '12',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'GPU',
    price: 999,
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/110/MTA-167369951/br-m036969-00220_vga-asus-amd-radeon-rx-7900-xtx-tuf-gaming-oc-24gb-gddr6_full05-8616462f.jpg',
    specs: { 'Stream Processors': '6144', 'Memory': '24GB GDDR6' },
    description: 'Exceptional 4K gaming performance and value.',
    inStock: true,
    rating: 4.8,
    reviews: 810,
  },
  {
    id: '13',
    name: 'RTX 5090: Founders Edition',
    category: 'GPU',
    price: 1799,
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/graphic-cards/50-series/rtx-5090/geforce-rtx-5090-learn-more-og-1200x630.jpg',
    specs: { 'CUDA Cores': '24576', 'Memory': '24GB GDDR7' },
    description: 'The pinnacle of gaming performance.',
    inStock: true,
    rating: 4.9,
    reviews: 1200,
  },
]

export function Dashboard() {
  const [filters, setFilters] = useState<FilterOptions>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { addItem } = useCart()
  const router = useRouter()

  // Scroll-driven entrance tied to hero height
  const [heroHeight, setHeroHeight] = useState(0)
  const dashboardRef = useRef<HTMLElement | null>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    const el = document.getElementById('hero-section')
    const setHeight = () => setHeroHeight(el ? el.getBoundingClientRect().height : 0)
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  // compute start/end ranges in pixels for the transition
  const start = heroHeight * 0.1
  const end = heroHeight * 0.7
  const opacity = useTransform(scrollY, [start, end], [0, 1])
  const translateY = useTransform(scrollY, [start, end], [50, 0])

  const allCategories = Array.from(new Set(mockComponents.map((c) => c.category)))

  const { x: parallaxX, y: parallaxY } = useParallax(20)

  // Reset to page 1 whenever filters or search term change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, searchTerm])

  const filteredComponents = mockComponents.filter(component => {
    if (searchTerm && !component.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (filters.category && component.category !== filters.category) {
      return false
    }
    return true
  })

  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage)
  const paginatedComponents = filteredComponents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <motion.section
      ref={dashboardRef}
      style={{ opacity, y: translateY }}
      className="section-padding relative overflow-hidden min-h-screen"
    >
  {/* Base background matched to Hero for consistent UI/UX */}
  <div className="absolute inset-0" />

      {/* Sophisticated Floating Elements - The id is moved from the parent section to the content container below */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Floating Orbs */}
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/5 via-cyan-500/3 to-teal-600/2 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400/6 via-pink-500/4 to-rose-600/3 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Medium Floating Shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/5 to-teal-500/3 rounded-full blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-amber-400/4 to-orange-500/3 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Small Geometric Shapes */}
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-violet-400/6 to-purple-500/4 rounded-lg blur-lg rotate-45"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            rotate: [45, 135, 45],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-cyan-400/5 to-blue-500/3 rounded-full blur-lg"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Enhanced Holographic Interface Overlay */}
      <HolographicInterface />

      {/* Premium Quantum Morphing Background Elements */}
      <QuantumMorphing
        className="absolute top-1/4 left-1/4 opacity-25"
      >
        <div className="w-56 h-56 bg-gradient-to-br from-primary-400/25 via-primary-500/20 to-primary-600/15 rounded-full blur-2xl" />
      </QuantumMorphing>

      <QuantumMorphing
        className="absolute bottom-1/3 right-1/4 opacity-30"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-secondary-400/30 via-secondary-500/25 to-secondary-600/20 rounded-full blur-2xl" />
      </QuantumMorphing>

      <QuantumMorphing
        className="absolute top-2/3 left-1/2 opacity-20"
      >
        <div className="w-48 h-48 bg-gradient-to-br from-accent-400/20 via-accent-500/15 to-accent-600/10 rounded-full blur-2xl" />
      </QuantumMorphing>

      <QuantumMorphing
        className="absolute top-1/6 right-1/6 opacity-15"
      >
        <div className="w-40 h-40 bg-gradient-to-br from-emerald-400/15 to-teal-500/10 rounded-full blur-xl" />
      </QuantumMorphing>

      <QuantumMorphing
        className="absolute bottom-1/6 left-1/6 opacity-18"
      >
        <div className="w-44 h-44 bg-gradient-to-br from-rose-400/18 to-pink-500/12 rounded-full blur-xl" />
      </QuantumMorphing>

      <div id="dashboard" className="container-max relative z-10">
        <motion.div
          className="text-center mb-20 pt-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-2xl rounded-full scale-150" />
              <div className="relative glass-card px-8 py-4 rounded-full border border-primary-500/20">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-widest">
                  ✨ Premium Collection
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100 bg-clip-text text-transparent mb-8 leading-tight"
            animate={professionalRipple}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Premium
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Components
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Discover our meticulously curated selection of cutting-edge PC components, engineered for unparalleled performance and built to exceed the demands of tomorrow's technology.
          </motion.p>

          <motion.div
            className="flex justify-center items-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Inventory</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Expert Support</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-12 flex flex-wrap gap-4 justify-center items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="flex-1 max-w-md relative">
            <motion.div className="relative" whileFocus={{ y: -2 }}>
              <input
                type="text"
                placeholder="Search premium components..."
                className="w-full px-6 py-4 bg-transparent border-b-2 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none transition-colors duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                initial={{ scaleX: 0 }}
                whileFocus={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {allCategories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={magneticHover}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={filters.category === category ? "primary" : "secondary"}
                onClick={() => setFilters({ ...filters, category: filters.category === category ? undefined : category })}
                className="px-6 py-3"
              >
                {category}
              </Button>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={magneticHover}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              onClick={() => setFilters({})}
              className="px-6 py-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        </motion.div>

        {/* Components Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {paginatedComponents.map((component, index) => (
              <motion.div
                key={component.id}
                variants={fadeInUp}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onHoverStart={() => setHoveredCard(component.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="h-full"
              >
                <div
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 transition-all duration-500 relative overflow-hidden hover:shadow-elegant hover:-translate-y-1 h-full overflow-hidden group flex flex-col"
                >
                  {/* Component Image */}
                  <div className="relative overflow-hidden rounded-t-xl">
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-800/50">
                      <motion.img
                        src={component.image}
                        alt={component.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Stock Status */}
                      {component.inStock ? (
                        <motion.div
                          className="absolute top-3 right-3 px-3 py-1 bg-success-500/80 backdrop-blur-sm text-white rounded-full text-xs font-semibold shadow-lg"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          In Stock
                        </motion.div>
                      ) : null}

                      {/* Rating */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-100">{component.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Component Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wide mb-1">
                        {component.category}
                      </p>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {component.name}
                      </h3>

                      {/* Specs Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
                          <span
                            key={key}
                            className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 rounded-md text-xs font-medium"
                          >
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        ${component.price}
                      </span>
                      <motion.div
                        className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ y: 10 }}
                        animate={{ y: hoveredCard === component.id ? 0 : 10 }}
                      >
                        <Button
                          className="px-3 py-2 text-sm"
                          onClick={() => addItem(component)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          className="px-3 py-2 text-sm"
                          variant="secondary"
                          onClick={() => router.push(`/component/${component.id}`)}
                        >
                          View Details
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
