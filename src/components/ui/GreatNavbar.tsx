'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { cn } from '@/lib/utils'
import { Search, User, Menu, X, Home, Info, Briefcase, Settings, Bell, LogOut, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
// import { useTranslations } from 'next-intl'

// Logo component
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 324 323" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="88.1023"
      y="144.792"
      width="151.802"
      height="36.5788"
      rx="18.2894"
      transform="rotate(-38.5799 88.1023 144.792)"
      fill="currentColor"
    />
    <rect
      x="85.3459"
      y="244.537"
      width="151.802"
      height="36.5788"
      rx="18.2894"
      transform="rotate(-38.5799 85.3459 244.537)"
      fill="currentColor"
    />
  </svg>
)

// Hamburger icon with animation
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
)

// Types
export interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
  active?: boolean
}

export interface GreatNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  logoHref?: string
  navigationLinks?: NavItem[]
  onSearch?: (query: string) => void
}

// Navigation labels are built inside the component so we can use translations from next-intl

const GreatNavbar = React.forwardRef<HTMLElement, GreatNavbarProps>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '/',
  navigationLinks,
      onSearch,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const pathname = usePathname()
    const { getTotalItems, toggleCart } = useCart()

    // Build translated nav links when a custom `navigationLinks` prop isn't provided
    const translatedNavigationLinks: NavItem[] = navigationLinks ?? [
      { href: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
      { href: '/build', label: 'Build PC', icon: <Briefcase className="w-4 h-4" /> },
      { href: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
      { href: '/dashboard', label: 'Dashboard', icon: <Settings className="w-4 h-4" /> },
    ]

    // Mobile detection
    useEffect(() => {
      const checkWidth = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkWidth()
      window.addEventListener('resize', checkWidth)
      return () => window.removeEventListener('resize', checkWidth)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch) onSearch(searchQuery)
      setIsSearchOpen(false)
    }

    const handleTransitionStart = useCallback(() => {
      // Propagate to parent layout
      if (window && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('themeTransitionStart'))
      }
    }, [])

    const handleTransitionEnd = useCallback(() => {
      // Propagate to parent layout
      if (window && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('themeTransitionEnd'))
      }
    }, [])

    return (
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 shadow-sm',
          className
        )}
        {...props}
        ref={ref}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-6">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="sm"
                    aria-label="Open navigation menu"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {translatedNavigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuLink asChild>
                            <Link href={link.href} legacyBehavior>
                              <a
                                className={cn(
                                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                  pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                                )}
                              >
                                {link.icon}
                                {link.label}
                              </a>
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            {/* Logo */}
            <Link href={logoHref} className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors">
              <div className="text-2xl">
                {logo}
              </div>
              <span className="hidden font-bold text-xl sm:inline-block">1ndraapc</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="flex gap-1">
                  {translatedNavigationLinks.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Link href={item.href} legacyBehavior>
                          <a
                            className={cn(
                              "group inline-flex h-9 w-max items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                              pathname === item.href
                                ? "bg-accent text-accent-foreground shadow-sm"
                                : "text-foreground/80 hover:text-foreground"
                            )}
                            aria-label={`Navigate to ${item.label}`}
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search */}
            {!isMobile && (
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </form>
            )}

            {/* Mobile Search Toggle */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 relative"
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle onTransitionStart={handleTransitionStart} onTransitionEnd={handleTransitionEnd} />

            {/* User Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 rounded-full relative"
                  aria-label="User menu"
                >
                  <User className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                  <div className="border-t my-2" />
                  <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Mobile Search */}
        {isMobile && isSearchOpen && (
          <div className="border-t px-4 py-3 md:hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                  autoFocus
                />
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </header>
    )
  }
)

GreatNavbar.displayName = 'GreatNavbar'

export { GreatNavbar }
