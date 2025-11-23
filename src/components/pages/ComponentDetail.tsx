'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SpotlightCard from '@/components/SpotlightCard'
import Aurora from '@/components/Aurora'
import { useCart } from '@/contexts/CartContext'
import { PCComponent } from '@/lib/types'
import { ShoppingCart, Star, Heart, Share2, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

// Mock data - replace with actual data fetching
const mockComponents: PCComponent[] = [
  {
    id: '1',
    name: 'RTX 4090 Graphics Card',
    category: 'GPU',
    price: 1599,
    image: 'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ada/rtx-4090/geforce-ada-4090-web-og-1200x630.jpg',
    specs: {
      'CUDA Cores': '16384',
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'Base Clock': '2235 MHz',
      'Boost Clock': '2520 MHz',
      'TDP': '450W',
      'Length': '304mm'
    },
    description: 'Ultimate gaming and creative performance with DLSS 3 and ray tracing. The RTX 4090 delivers unparalleled graphics performance for gaming, content creation, and AI workloads.',
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
    specs: {
      'Cores': '24',
      'Threads': '32',
      'Base Clock': '3.0GHz',
      'Boost Clock': '5.8GHz',
      'Cache': '36MB',
      'Socket': 'LGA 1700',
      'TDP': '125W'
    },
    description: 'High-performance desktop processor with 24 cores and 32 threads. Perfect for gaming, content creation, and demanding workloads.',
    inStock: true,
    rating: 4.8,
    reviews: 892,
  },
  // Add more components as needed...
]

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    user: 'TechGamer2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechGamer',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely incredible performance! This GPU handles everything I throw at it with ease. The ray tracing is phenomenal.',
    helpful: 24
  },
  {
    id: '2',
    user: 'ContentCreator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Creator',
    rating: 4,
    date: '2024-01-10',
    comment: 'Great for video editing and 3D rendering. A bit pricey but worth every penny for the performance gains.',
    helpful: 18
  },
  {
    id: '3',
    user: 'GamerPro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer',
    rating: 5,
    date: '2024-01-08',
    comment: 'Future-proof gaming performance. Runs all games at max settings with DLSS enabled.',
    helpful: 31
  }
]

interface ComponentDetailProps {
  componentId: string
}

export function ComponentDetail({ componentId }: ComponentDetailProps) {
  const [component, setComponent] = useState<PCComponent | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    // Simulate API call
    const fetchComponent = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      const foundComponent = mockComponents.find(c => c.id === componentId)
      setTimeout(() => {
        setComponent(foundComponent || null)
        setLoading(false)
      }, 500)
    }

    fetchComponent()
  }, [componentId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Component Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            The component you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(component)
  }

  const imageGallery = [
    component.image,
    // Add more images if available
  ]

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <Aurora
          colorStops={['#5227FF', '#7cff67', '#5227FF']}
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Components
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <SpotlightCard className="p-8">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={imageGallery[selectedImage]}
                  alt={component.name}
                  className="w-full h-full object-contain"
                />
                {component.inStock && (
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                )}
              </div>
            </SpotlightCard>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {imageGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary-500'
                      : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${component.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <SpotlightCard className="p-8">
              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {component.category}
                  </Badge>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {component.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(component.rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {component.rating} ({component.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  ${component.price}
                </div>

                {/* Description */}
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {component.description}
                </p>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
                    />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <SpotlightCard className="p-8">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({component.reviews})</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(component.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-3 border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {key}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-neutral-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-neutral-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 mb-2">
                            {review.comment}
                          </p>
                          <Button variant="ghost" size="sm">
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compatibility" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Compatibility Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <h4 className="font-medium mb-2">Compatible With</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                        <li>• Intel LGA 1700 motherboards (for CPUs)</li>
                        <li>• PCIe 4.0/5.0 compatible systems</li>
                        <li>• ATX power supplies (750W+ recommended)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                        <li>• Adequate cooling system</li>
                        <li>• Compatible case dimensions</li>
                        <li>• Sufficient power delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  )
}
