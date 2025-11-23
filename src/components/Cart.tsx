'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export function Cart() {
  const { state, removeItem, updateQuantity, clearCart, setCartOpen, getTotalPrice } = useCart()
  const totalPrice = getTotalPrice()

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Shopping Cart
                </h2>
                <span className="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                  {state.items.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-16 h-16 text-neutral-400 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-500">
                    Add some premium components to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-primary-600 dark:text-primary-400 font-bold text-lg mb-3">
                          ${item.price}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-neutral-900 dark:text-neutral-100">Total:</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1 py-3 text-base"
                  >
                    Clear Cart
                  </Button>
                  <Link href="/en/checkout" className="flex-1" onClick={() => setCartOpen(false)}>
                    <Button className="w-full py-3 text-base">
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
