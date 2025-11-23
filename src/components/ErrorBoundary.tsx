"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error | null
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: any) {
    // eslint-disable-next-line no-console
    console.error('Client-side rendering error:', error, info)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
    try {
      // Try a hard reload to recover
      if (typeof window !== 'undefined') window.location.reload()
    } catch (e) {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">An unexpected error occurred while rendering the site. You can try reloading the page.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={this.reset} className="px-4 py-2 rounded-md bg-primary text-white">Reload</button>
              <a href="/" className="px-4 py-2 rounded-md border">Go to Home</a>
            </div>
            <pre className="mt-4 text-xs text-left whitespace-pre-wrap bg-neutral-100 dark:bg-neutral-800 p-3 rounded">{String(this.state.error?.message ?? '')}</pre>
          </div>
        </div>
      )
    }

    return this.props.children as React.ReactElement
  }
}
