"use client"

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log to console and optionally send to monitoring
    // eslint-disable-next-line no-console
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          <div className="max-w-xl text-center">
            <h1 className="text-2xl font-bold mb-2">Application Error</h1>
            <p className="mb-4">An unexpected error occurred while rendering the app.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => reset()} className="px-4 py-2 rounded-md bg-primary text-white">Try again</button>
              <a href="/" className="px-4 py-2 rounded-md border">Home</a>
            </div>
            <pre className="mt-4 text-xs text-left whitespace-pre-wrap bg-neutral-100 dark:bg-neutral-800 p-3 rounded">{String(error?.message ?? '')}</pre>
          </div>
        </div>
      </body>
    </html>
  )
}
