'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Apple, ArrowRight, Lock, ShoppingCart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

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

type Method = 'apple' | 'wise' | 'bank'

const PaymentPage = () => {
  const { state } = useCart()
  const [method, setMethod] = useState<Method>('apple')

  const subtotal = state.items.reduce((sum, item) => sum + item.productData.basePrice, 0)
  const serviceFee = state.items.reduce((sum, item) => sum + item.productData.basePrice * 0.05, 0)
  const shippingCost = state.items.reduce((sum, item) => {
    const option = shippingOptions.find(s => s.id === item.shippingMethod)
    return sum + (option?.cost || 0)
  }, 0)
  const finalTotal = subtotal + serviceFee + shippingCost

  const currencyData = currencies.find(c => c.code === state.selectedCurrency)
  const finalTotalInCurrency = finalTotal * (currencyData?.rate || 1)

  const estimatedDelivery = state.items.length > 0
    ? shippingOptions.find(s => s.id === state.items[0].shippingMethod)?.days
    : '-'

  const handleComplete = () => {
    alert(`Order completed with ${method}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="container-custom flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">PakShopper</Link>
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600">
            <ShoppingCart className="w-6 h-6" />
            {state.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full px-1">
                {state.totalItems}
              </span>
            )}
          </Link>
        </div>
        <div className="bg-gray-100">
          <div className="container-custom">
            <ol className="flex items-center text-sm text-gray-500">
              <li className="flex items-center">
                <Link href="/cart" className="py-3">Cart</Link>
                <ArrowRight className="w-4 h-4 mx-2" />
              </li>
              <li className="flex items-center">
                <span className="py-3">Order Details</span>
                <ArrowRight className="w-4 h-4 mx-2" />
              </li>
              <li className="flex items-center text-primary-600 font-medium">
                <span className="py-3">Payment</span>
              </li>
            </ol>
          </div>
        </div>
      </header>

      <main className="container-custom pt-32 pb-16 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods and Billing */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-xl shadow-soft">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose your payment method</h2>
            <div className="space-y-6">
              <button
                type="button"
                onClick={() => setMethod('apple')}
                className={`w-full bg-black text-white rounded-lg py-4 flex items-center justify-center hover:opacity-90 transition ${method === 'apple' ? 'ring-2 ring-primary-500' : ''}`}
              >
                <Apple className="w-5 h-5 mr-2" /> Pay with Apple Pay
              </button>

              <div
                className={`border rounded-lg p-4 ${method === 'wise' ? 'border-primary-500' : 'border-gray-200'}`}
              >
                <h3 className="font-medium mb-2">Wise (International Transfer)</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pay directly from your bank using Wise for cheaper FX rates.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm mb-3">
                  <div className="flex justify-between"><span>Account Email:</span><span className="font-medium">payments@pakshopper.com</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => setMethod('wise')}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg py-2"
                >
                  Pay via Wise
                </button>
              </div>

              <div
                className={`border rounded-lg p-4 space-y-4 ${method === 'bank' ? 'border-primary-500' : 'border-gray-200'}`}
              >
                <div>
                  <h3 className="font-medium mb-2">Bank Transfer (Local Pakistani Account)</h3>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between"><span>Account Name:</span><span className="font-medium">PakShopper Pvt Ltd</span></div>
                    <div className="flex justify-between"><span>IBAN/Account:</span><span className="font-medium">PK00PSHB0000000000000000</span></div>
                    <div className="flex justify-between"><span>Bank:</span><span className="font-medium">Meezan Bank - 1234</span></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    After transfer, upload your proof of payment.
                  </p>
                  <input
                    type="file"
                    className="mt-2 w-full"
                    onChange={() => setMethod('bank')}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMethod('bank')}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-2"
                >
                  Confirm Bank Transfer
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-soft">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                <input type="text" className="input-field mb-2" placeholder="Street address" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" className="input-field" placeholder="City" />
                  <input type="text" className="input-field" placeholder="Country" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-sm text-gray-600 mt-2">
                  <input type="checkbox" className="mr-2" /> Billing address same as shipping
                </label>
              </div>
            </div>
          </section>

          <section className="flex items-center space-x-3 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Your payment is secure. We never store card or bank credentials.</span>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6 sticky top-32 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            {state.items.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-800">{item.productData.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.orderDetails.size || 'N/A'} • Qty: {item.orderDetails.quantity}</p>
                </div>
                <p className="font-medium">₨{item.productData.basePrice.toLocaleString()}</p>
              </div>
            ))}
            <div className="space-y-1 pt-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₨{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Service Fee</span><span>₨{serviceFee.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₨{shippingCost.toLocaleString()}</span></div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span>₨{finalTotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Total in {state.selectedCurrency}</span><span>{currencyData?.symbol}{finalTotalInCurrency.toFixed(2)}</span></div>
            </div>
            <p className="text-xs text-gray-500">Estimated delivery time: {estimatedDelivery}</p>
          </div>
        </aside>
      </main>

      <div className="bg-white border-t border-gray-200 py-6">
        <div className="container-custom">
          <button
            className="w-full btn-primary text-lg py-4"
            onClick={handleComplete}
          >
            Complete Order with {method === 'apple' ? 'Apple Pay' : method === 'wise' ? 'Wise' : 'Bank Transfer'}
          </button>
          <p className="text-center text-sm text-gray-600 mt-2">
            You’ll receive a confirmation email after we verify your payment.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

