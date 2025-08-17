'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface ProductData {
  name: string
  brand: string
  url: string
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

export interface CartItem {
  id: string
  productData: ProductData
  orderDetails: OrderDetails
  selectedQC: QualityControl | null
  shippingMethod: string
  addedAt: Date
  totalInPKR: number
  totalInSelectedCurrency: number
}

interface CartState {
  items: CartItem[]
  selectedCurrency: string
  totalItems: number
  subtotalPKR: number
  subtotalSelectedCurrency: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  items: [],
  selectedCurrency: 'USD',
  totalItems: 0,
  subtotalPKR: 0,
  subtotalSelectedCurrency: 0
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItems = [...state.items, action.payload]
      return calculateCartTotals({
        ...state,
        items: newItems
      })

    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      )
      return calculateCartTotals({
        ...state,
        items: updatedItems
      })

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      return calculateCartTotals({
        ...state,
        items: filteredItems
      })

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        subtotalPKR: 0,
        subtotalSelectedCurrency: 0
      }

    case 'SET_CURRENCY':
      return calculateCartTotals({
        ...state,
        selectedCurrency: action.payload
      })

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const calculateCartTotals = (state: CartState): CartState => {
  const totalItems = state.items.length
  const subtotalPKR = state.items.reduce((sum, item) => sum + item.totalInPKR, 0)
  
  // Currency conversion rates (simplified - in real app, fetch from API)
  const currencyRates: { [key: string]: number } = {
    USD: 0.0036,
    EUR: 0.0033,
    GBP: 0.0028,
    CAD: 0.0049,
    AUD: 0.0055
  }
  
  const rate = currencyRates[state.selectedCurrency] || 1
  const subtotalSelectedCurrency = subtotalPKR * rate

  return {
    ...state,
    totalItems,
    subtotalPKR,
    subtotalSelectedCurrency
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  setCurrency: (currency: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pakshopper-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Convert string dates back to Date objects
        const cartWithDates = {
          ...parsedCart,
          items: parsedCart.items.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }))
        }
        dispatch({ type: 'LOAD_CART', payload: cartWithDates })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pakshopper-cart', JSON.stringify(state))
  }, [state])

  const addItem = (item: Omit<CartItem, 'id' | 'addedAt'>) => {
    const newItem: CartItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      addedAt: new Date()
    }
    dispatch({ type: 'ADD_ITEM', payload: newItem })
  }

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const setCurrency = (currency: string) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency })
  }

  const value: CartContextType = {
    state,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    setCurrency
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
