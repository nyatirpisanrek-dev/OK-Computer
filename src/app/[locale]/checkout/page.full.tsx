"use client"

import React, { useMemo, useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, CreditCard, Loader2, MapPin, Package2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import SpotlightCard from "@/components/SpotlightCard"

function currency(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n)
}

export default function CheckoutPage() {
  const { state, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<"details" | "shipping" | "payment" | "review" | "success">("details")

  const subtotal = getTotalPrice()
  const shipping = useMemo(() => (subtotal > 200 ? 0 : subtotal === 0 ? 0 : 9.99), [subtotal])
  const tax = useMemo(() => +(subtotal * 0.1).toFixed(2), [subtotal])
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax])

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    shippingMethod: "standard",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    saveInfo: true,
  })

  function canProceedFromDetails() {
    const { firstName, lastName, email, address, city, zip, country } = form
    return [firstName, lastName, email, address, city, zip, country].every(Boolean)
  }

  function canProceedFromPayment() {
    const { cardName, cardNumber, cardExpiry, cardCvc } = form
    return [cardName, cardNumber, cardExpiry, cardCvc].every(Boolean)
  }

  const handlePlaceOrder = async () => {
    setSubmitting(true)
    // Simulate API
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setStep("success")
    clearCart()
  }

  const Stepper = () => (
    <div className="flex items-center justify-center gap-3 text-sm font-medium">
      {[
        { key: "details", label: "Details" },
        { key: "shipping", label: "Shipping" },
        { key: "payment", label: "Payment" },
        { key: "review", label: "Review" },
      ].map((s, idx) => {
        const active = step === s.key
        const passed = ["shipping", "payment", "review", "success"].includes(step) && s.key !== "details"
        return (
          <React.Fragment key={s.key}>
            <div
              className={
                "px-3 py-1 rounded-full border text-xs md:text-sm " +
                (active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/30 border-border")
              }
            >
              {s.label}
            </div>
            {idx < 3 && <div className="w-8 h-[1px] bg-border" />}
          </React.Fragment>
        )
      })}
    </div>
  )

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Aurora />
      </div>
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground mt-1">Secure and fast. No hidden fees.</p>
          </div>
          <Link href="/" className="text-sm text-primary hover:underline">Continue shopping</Link>
        </div>

        <div className="mb-6"><Stepper /></div>

        {/* simplified backup of full original file */}

        <div className="max-w-2xl mx-auto">
          <SpotlightCard className="text-center">
            <div className="mx-auto mb-4 size-12 rounded-full bg-green-500/10 text-green-600 grid place-items-center">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold">Order placed successfully</h2>
            <p className="text-muted-foreground mt-2">
              You will receive an email confirmation with your order details shortly.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/" className="inline-flex"><Button variant="outline">Back to Home</Button></Link>
              <Link href="/dashboard" className="inline-flex"><Button>View Orders</Button></Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  )
}
