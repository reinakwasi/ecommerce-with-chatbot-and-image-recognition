"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Package,
  Store,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { SmartSearchBar } from "./smart-search-bar"

interface NavigationProps {
  user?: {
    id: string
    name: string
    email: string
    role: "customer" | "seller" | "admin"
    avatar?: string
  }
  cartCount?: number
  wishlistCount?: number
}

export function Navigation({ user, cartCount = 0, wishlistCount = 0 }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Desktop Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-soft border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text-warm">SmartShop</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${
                    isActive(item.href)
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative group" aria-label="Notifications">
                <Bell className="w-4 h-4" />
                <span className="sr-only">Notifications</span>
                <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-900 text-white text-xs rounded px-2 py-1 transition-all">Notifications</span>
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
              </Button>

              {/* Wishlist */}
              <Link href="/customer/wishlist" aria-label="Wishlist">
                <Button variant="ghost" size="sm" className="relative group">
                  <Heart className="w-4 h-4" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {wishlistCount}
                    </Badge>
                  )}
                  <span className="sr-only">Wishlist</span>
                  <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-900 text-white text-xs rounded px-2 py-1 transition-all">Wishlist</span>
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/customer/cart" aria-label="Cart">
                <Button variant="ghost" size="sm" className="relative group">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">Cart</span>
                  <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-900 text-white text-xs rounded px-2 py-1 transition-all">Cart</span>
                </Button>
              </Link>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative group" aria-label="User menu">
                      <User className="w-4 h-4" />
                      <span className="sr-only">User menu</span>
                      <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-900 text-white text-xs rounded px-2 py-1 transition-all">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.role === "customer" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/customer/dashboard" className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/customer/orders" className="flex items-center">
                            <Package className="w-4 h-4 mr-2" />
                            Orders
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.role === "seller" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/dashboard" className="flex items-center">
                            <Store className="w-4 h-4 mr-2" />
                            Seller Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/seller/products" className="flex items-center">
                            <Package className="w-4 h-4 mr-2" />
                            My Products
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {user.role === "admin" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin/dashboard" className="flex items-center">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/help" className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        Help & Support
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center text-red-600 dark:text-red-400">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm" className="btn-primary">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <div className="w-4 h-4 bg-gray-900 rounded-full" />
                ) : (
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="gradient-text-warm">SmartShop</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  {/* Mobile Navigation */}
                  <nav className="space-y-4">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block text-lg font-medium transition-colors ${
                          isActive(item.href)
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t pt-6">
                    <div className="space-y-4">
                      <Link href="/customer/cart" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart ({cartCount})</span>
                      </Link>
                      <Link href="/customer/wishlist" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Heart className="w-5 h-5" />
                        <span>Wishlist ({wishlistCount})</span>
                      </Link>
                    </div>
                  </div>

                  {user ? (
                    <div className="border-t pt-6">
                      <div className="space-y-4">
                        <div className="p-3">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <Button variant="outline" className="w-full">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-6 space-y-3">
                      <Link href="/auth/login">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button className="w-full btn-primary">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Smart Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-4xl">
            <SmartSearchBar />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
} 