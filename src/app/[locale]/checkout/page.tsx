"use client"

import Link from "next/link"

export default function CheckoutPageStub() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Checkout (temporarily disabled)</h1>
        <p className="text-muted-foreground mb-4">The full checkout is temporarily unavailable while we fix a build issue.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="px-4 py-2 rounded-md border">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
