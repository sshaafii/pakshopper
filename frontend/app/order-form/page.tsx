'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, Info, Check, Package, Camera, Star } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '../../contexts/CartContext'

interface ProductData {
  name: string
  brand: string
  url: string
  image: string
  basePrice: number
  currency: string
}

interface OrderDetails {
  size: string
  quantity: number
  color: string
  specialInstructions: string
  customMeasurements: File | null
}

interface QualityControl {
  type: 'standard' | 'detailed' | 'premium'
  fee: number
  description: string
}

const OrderForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem } = useCart()
  const productUrlFromParams = searchParams.get('url')

  // Product data from user input
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    brand: '',
    url: productUrlFromParams || '',
    image: '',
    basePrice: 0,
    currency: 'PKR'
  })

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    size: '',
    quantity: 1,
    color: '',
    specialInstructions: '',
    customMeasurements: null
  })

  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedQC, setSelectedQC] = useState<QualityControl | null>(null)
  const [shippingMethod, setShippingMethod] = useState('standard')

  // Update product URL when params change
  useEffect(() => {
    if (productUrlFromParams) {
      setProductData(prev => ({ ...prev, url: productUrlFromParams }))
    }
  }, [productUrlFromParams])

  const qualityControlOptions: QualityControl[] = [
    {
      type: 'standard',
      fee: 0,
      description: 'Basic quality check with 2-3 photos'
    },
    {
      type: 'detailed',
      fee: 500,
      description: 'Comprehensive check with 5-8 detailed photos'
    },
    {
      type: 'premium',
      fee: 1000,
      description: 'Premium service with 10+ photos and video inspection'
    }
  ]

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', cost: 1500, days: '7-14' },
    { id: 'express', name: 'Express Shipping', cost: 2500, days: '3-7' },
    { id: 'premium', name: 'Premium Shipping', cost: 3500, days: '2-5' }
  ]

  const currencies = [
    { code: 'USD', symbol: '$', rate: 0.0036 },
    { code: 'EUR', symbol: '€', rate: 0.0033 },
    { code: 'GBP', symbol: '£', rate: 0.0028 },
    { code: 'CAD', symbol: 'C$', rate: 0.0049 },
    { code: 'AUD', symbol: 'A$', rate: 0.0055 }
  ]

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency)

  // Calculate costs
  const serviceFee = productData.basePrice > 0 ? productData.basePrice * 0.05 : 0 // 5% service fee
  const qcFee = selectedQC?.fee || 0
  const shippingCost = shippingOptions.find(s => s.id === shippingMethod)?.cost || 0
  const subtotal = productData.basePrice + serviceFee + qcFee + shippingCost
  const totalInPKR = subtotal
  const totalInSelectedCurrency = totalInPKR * (selectedCurrencyData?.rate || 1)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOrderDetails(prev => ({ ...prev, customMeasurements: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!productData.basePrice || productData.basePrice <= 0) {
      alert('Please enter a valid base price for the product')
      return
    }
    
    if (!productData.url) {
      alert('Please provide the product URL')
      return
    }
    
    // Add item to cart
    addItem({
      productData,
      orderDetails,
      selectedQC,
      shippingMethod,
      totalInPKR,
      totalInSelectedCurrency
    })
    
    // Redirect to cart page
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Complete Your Order</h1>
                <p className="text-gray-600">Review product details and customize your order</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Product Information */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary-600" />
                  Product Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={productData.name}
                      onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand/Store
                    </label>
                    <input
                      type="text"
                      value={productData.brand}
                      onChange={(e) => setProductData(prev => ({ ...prev, brand: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product URL
                    </label>
                    <input
                      type="url"
                      value={productData.url}
                      onChange={(e) => setProductData(prev => ({ ...prev, url: e.target.value }))}
                      className="input-field"
                      placeholder="https://example.com/product/..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price (PKR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={productData.basePrice || ''}
                      onChange={(e) => {
                        const value = e.target.value
                        setProductData(prev => ({ 
                          ...prev, 
                          basePrice: value === '' ? 0 : Number(value) 
                        }))
                      }}
                      className="input-field"
                      min="0"
                      required
                      placeholder="Enter the product price in Pakistani Rupees"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Enter the price shown on the product page in Pakistani Rupees (PKR)
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <select
                      value={orderDetails.size}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, size: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                      <option value="custom">Custom Size</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={orderDetails.quantity}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                      className="input-field"
                      min="1"
                      max="10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color/Style Variant
                    </label>
                    <input
                      type="text"
                      value={orderDetails.color}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, color: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., Navy Blue, Floral Print"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={orderDetails.specialInstructions}
                      onChange={(e) => setOrderDetails(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Any special requirements, alterations, or notes..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Measurements (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*,.pdf"
                        className="hidden"
                        id="measurements-upload"
                      />
                      <label htmlFor="measurements-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {orderDetails.customMeasurements 
                            ? `File selected: ${orderDetails.customMeasurements.name}`
                            : 'Click to upload measurements or size chart'
                          }
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Supports: JPG, PNG, PDF (Max 5MB)
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Control Options */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary-600" />
                  Quality Control Options
                </h2>
                
                <div className="space-y-4">
                  {qualityControlOptions.map((option) => (
                    <label key={option.type} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="qc-option"
                        value={option.type}
                        checked={selectedQC?.type === option.type}
                        onChange={() => setSelectedQC(option)}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900 capitalize">
                              {option.type} QC
                            </span>
                            {option.fee > 0 && (
                              <span className="ml-2 text-sm text-gray-500">
                                (+₨{option.fee.toLocaleString()})
                              </span>
                            )}
                          </div>
                          {option.type === 'standard' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Free
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Shipping Method
                </h2>
                
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingMethod === option.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{option.name}</span>
                          <span className="text-sm text-gray-600">
                            ₨{option.cost.toLocaleString()} • {option.days} days
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Summary */}
            <div className="space-y-6">
              {/* Pricing Breakdown */}
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Pricing & Fees
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-medium">₨{productData.basePrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Fee (5%)</span>
                    <span className="font-medium">₨{serviceFee.toLocaleString()}</span>
                  </div>
                  
                  {selectedQC && selectedQC.fee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quality Control</span>
                      <span className="font-medium">₨{qcFee.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₨{shippingCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total (PKR)</span>
                      <span className="text-xl font-bold text-primary-600">
                        ₨{totalInPKR.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="input-field text-sm"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} ({currency.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className="text-sm text-gray-600">Total in {selectedCurrency}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedCurrencyData?.symbol}{totalInSelectedCurrency.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary mt-6 text-lg py-4"
                >
                  Confirm Order
                </button>
                
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Info className="w-4 h-4" />
                    <span>You won't be charged until order confirmation</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span>{orderDetails.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span>{orderDetails.size || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">QC Level:</span>
                    <span className="capitalize">{selectedQC?.type || 'Standard'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="capitalize">{shippingMethod}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OrderForm
