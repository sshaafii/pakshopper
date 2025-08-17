'use client'

import { useState } from 'react'
import { ArrowRight, Globe, Shield, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const [productLink, setProductLink] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (productLink.trim()) {
      // Redirect to order form with the product link
      router.push(`/order-form?url=${encodeURIComponent(productLink)}`)
    }
  }

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      text: 'Worldwide Shipping',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: 'Quality Guaranteed',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      text: 'Fast Delivery',
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="relative section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Shop Pakistani Fashion{' '}
              <span className="text-gradient">Worldwide</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your trusted purchasing agent for authentic Pakistani clothing and lifestyle products. 
              Quality control, transparent pricing, and hassle-free shopping.
            </p>

            {/* Product Link Input */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="url"
                  placeholder="Paste your Pakistani product link here..."
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  className="input-field flex-1 text-lg"
                  required
                />
                <button type="submit" className="btn-primary text-lg px-8">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </div>
            </form>

            {/* Trust Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="text-primary-500">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent-400 rounded-full opacity-20 animate-bounce-gentle"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary-300 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
    </section>
  )
}

export default Hero
