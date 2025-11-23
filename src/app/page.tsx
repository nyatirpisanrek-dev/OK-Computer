import { Hero } from '@/components/pages/Hero'
import { Dashboard } from '@/components/pages/Dashboard'
import EnterAnimation from '@/components/animations/EnterAnimation'
import { AboutPage } from '@/components/pages/AboutPage'
import ScrollFloat from '@/components/ScrollFloat'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Dashboard />
      <AboutPage />
      <div className="flex justify-center py-20">
        <EnterAnimation />
      </div>
    </div>
  )
}
