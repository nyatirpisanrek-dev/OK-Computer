export interface PCComponent {
  id: string
  name: string
  category: string
  price: number
  image: string
  specs: Record<string, string>
  description: string
  inStock: boolean
  rating: number
  reviews: number
}

export interface PCBuild {
  id: string
  name: string
  components: Record<string, PCComponent>
  totalPrice: number
  compatible: boolean
  saved: boolean
}

export interface BuildComponent {
  category: string
  component: PCComponent | null
}

export interface ComponentCategory {
  id: string
  name: string
  icon: string
  count: number
}

export interface FilterOptions {
  category?: string
  priceRange?: [number, number]
  inStock?: boolean
  rating?: number
}
