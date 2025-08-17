'use client'

import { useState } from 'react'
import { ArrowLeft, Trash2, Edit3, Package, ShoppingBag, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../contexts/CartContext'
import type { CartItem } from '../../contexts/CartContext'

// Utility function for formatting dates
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const CartPage = () => {
  const { state, removeItem, clearCart, setCurrency } = useCart()
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const currencies = [
    { code: 'USD', symbol: '$', rate: 0.0036 },
    { code: 'EUR', symbol: '€', rate: 0.0033 },
    { code: 'GBP', symbol: '£', rate: 0.0028 },
    { code: 'CAD', symbol: 'C$', rate: 0.0049 },
    { code: 'AUD', symbol: 'A$', rate: 0.0055 }
  ]

  const selectedCurrencyData = currencies.find(c => c.code === state.selectedCurrency)

  const handleRemoveItem = (id: string) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      removeItem(id)
    }
  }

  const handleClearCart = () => {
    clearCart()
    setShowClearConfirm(false)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <div className="container-custom py-16">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet. Start shopping to see your items here.
              </p>
              <div className="space-x-4">
                <Link href="/" className="btn-primary">
                  Start Shopping
                </Link>
                <Link href="/order-form" className="btn-secondary">
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                  <p className="text-gray-600">{state.totalItems} item{state.totalItems !== 1 ? 's' : ''} in your cart</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={state.selectedCurrency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-200 outline-none"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} ({currency.symbol})
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveItem(item.id)}
                  onEdit={() => setEditingItem(item.id)}
                  isEditing={editingItem === item.id}
                  onSaveEdit={(updates) => {
                    // Handle edit updates here
                    setEditingItem(null)
                  }}
                  onCancelEdit={() => setEditingItem(null)}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Items ({state.totalItems})</span>
                    <span className="font-medium">₨{state.subtotalPKR.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Total in {state.selectedCurrency}</span>
                    <span className="font-medium">
                      {selectedCurrencyData?.symbol}{state.subtotalSelectedCurrency.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-4">
                      Proceed to Checkout
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <AlertCircle className="w-4 h-4" />
                      <span>You won't be charged until checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Cart?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all items from your cart? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

// Cart Item Card Component
interface CartItemCardProps {
  item: CartItem
  onRemove: () => void
  onEdit: () => void
  isEditing: boolean
  onSaveEdit: (updates: Partial<CartItem>) => void
  onCancelEdit: () => void
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onRemove,
  onEdit,
  isEditing,
  onSaveEdit,
  onCancelEdit
}) => {
  const [editForm, setEditForm] = useState({
    quantity: item.orderDetails.quantity,
    size: item.orderDetails.size,
    color: item.orderDetails.color,
    specialInstructions: item.orderDetails.specialInstructions
  })

  const handleSave = () => {
    onSaveEdit({
      orderDetails: {
        ...item.orderDetails,
        ...editForm
      }
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-start space-x-4">
        {/* Product Icon */}
        <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-8 h-8 text-primary-600" />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.productData.name}</h3>
              <p className="text-gray-600 mb-2">{item.productData.brand}</p>
              
              {!isEditing ? (
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Size: {item.orderDetails.size || 'Not specified'}</p>
                  <p>Color: {item.orderDetails.color || 'Not specified'}</p>
                  <p>Quantity: {item.orderDetails.quantity}</p>
                  {item.orderDetails.specialInstructions && (
                    <p>Notes: {item.orderDetails.specialInstructions}</p>
                  )}
                  <p>Added: {formatDate(item.addedAt)}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editForm.size}
                      onChange={(e) => setEditForm(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="Size"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={editForm.color}
                      onChange={(e) => setEditForm(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="Color"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <input
                    type="number"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                    min="1"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-24"
                  />
                  <textarea
                    value={editForm.specialInstructions}
                    onChange={(e) => setEditForm(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    placeholder="Special instructions..."
                    rows={2}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
                  />
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              {!isEditing ? (
                <>
                  <button
                    onClick={onEdit}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="Edit item"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onRemove}
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancelEdit}
                    className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">₨{item.productData.basePrice.toLocaleString()}</span>
            </div>
            {item.selectedQC && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Quality Control:</span>
                <span className="font-medium">₨{item.selectedQC.fee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">₨{/* Calculate shipping cost based on shippingMethod */}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-primary-600">₨{item.totalInPKR.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
