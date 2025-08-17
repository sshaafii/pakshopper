'use client'

import { useState } from 'react'
import { Menu, X, ShoppingBag, ArrowRight, User, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [productLink, setProductLink] = useState('')
  const router = useRouter()
  const { state } = useCart()

  const navigation = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '/faq' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (productLink.trim()) {
      // Redirect to order form with the product link
      router.push(`/order-form?url=${encodeURIComponent(productLink)}`)
    }
  }

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <img 
              src="/images/pakshopper-logo.png" 
              alt="PakShopper Logo" 
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">PakShopper</span>
              <span className="text-xs text-gray-600 -mt-1">.com</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Product Link Input */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                type="url"
                placeholder="Paste product link..."
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-200 transition-all duration-200 outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                title="Submit product link"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200">
              <ShoppingBag className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.totalItems > 9 ? '9+' : state.totalItems}
                </span>
              )}
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button className="btn-primary text-sm py-2 px-4">
                Sign Up
              </button>
            </div>
            
            <button className="btn-primary">
              Start Shopping
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-500 p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-500 font-medium px-4 py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Product Link Input */}
              <div className="px-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="url"
                    placeholder="Paste your Pakistani product link..."
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-200 transition-all duration-200 outline-none"
                    required
                  />
                  <button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Submit Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Mobile Cart Link */}
              <div className="px-4">
                <Link 
                  href="/cart" 
                  className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-primary-600 font-medium py-2 px-4 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart ({state.totalItems})</span>
                </Link>
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="px-4 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-primary-600 font-medium py-2 px-4 transition-colors duration-200">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button className="w-full btn-primary">
                  Sign Up
                </button>
              </div>
              
              <div className="px-4">
                <button className="btn-primary w-full">
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
