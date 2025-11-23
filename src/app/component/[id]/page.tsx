'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PCComponent } from '@/lib/types'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart, ArrowLeft, Star, CheckCircle, XCircle } from 'lucide-react'

// Mock data - should be replaced with actual data fetching
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

type Props = {
	params: { id: string }
}

export default function ComponentPage({ params }: Props) {
	const { id } = params
	const router = useRouter()
	const { addItem } = useCart()

	const component = mockComponents.find(c => c.id === id)

	if (!component) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
						Component Not Found
					</h1>
					<p className="text-neutral-600 dark:text-neutral-400 mb-8">
						The component you're looking for doesn't exist.
					</p>
					<Button onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Go Back
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
			{/* Header */}
			<div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
				<div className="container-max px-6 py-4">
					<Button
						variant="ghost"
						onClick={() => router.back()}
						className="mb-4"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Components
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className="container-max px-6 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Image Section */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						<div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden">
							<img
								src={component.image}
								alt={component.name}
								className="w-full h-full object-contain"
							/>
							{/* Stock Status Badge */}
							<div className="absolute top-4 right-4">
								{component.inStock ? (
									<div className="flex items-center gap-2 bg-success-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-semibold">
										<CheckCircle className="w-4 h-4" />
										In Stock
									</div>
								) : (
									<div className="flex items-center gap-2 bg-error-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-semibold">
										<XCircle className="w-4 h-4" />
										Out of Stock
									</div>
								)}
							</div>
						</div>
					</motion.div>

					{/* Details Section */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-6"
					>
						{/* Category */}
						<div className="inline-block">
							<span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
								{component.category}
							</span>
						</div>

						{/* Title */}
						<h1 className="text-4xl lg:text-5xl font-black text-neutral-900 dark:text-neutral-100 leading-tight">
							{component.name}
						</h1>

						{/* Rating */}
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1">
								<Star className="w-5 h-5 text-yellow-500 fill-current" />
								<span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
									{component.rating}
								</span>
							</div>
							<span className="text-neutral-600 dark:text-neutral-400">
								({component.reviews} reviews)
							</span>
						</div>

						{/* Price */}
						<div className="text-5xl font-bold text-neutral-900 dark:text-neutral-100">
							${component.price}
						</div>

						{/* Description */}
						<p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
							{component.description}
						</p>

						{/* Specifications */}
						<div className="space-y-4">
							<h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
								Specifications
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{Object.entries(component.specs).map(([key, value]) => (
									<div
										key={key}
										className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4"
									>
										<div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
											{key}
										</div>
										<div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
											{value}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-6">
							<Button
								onClick={() => addItem(component)}
								disabled={!component.inStock}
								className="flex-1 py-4 text-lg"
							>
								<ShoppingCart className="w-5 h-5 mr-2" />
								Add to Cart
							</Button>
							<Button
								variant="secondary"
								onClick={() => router.back()}
								className="px-8 py-4 text-lg"
							>
								Back
							</Button>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
