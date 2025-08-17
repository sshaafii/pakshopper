# Cart Functionality Design Document

## Overview
Implement a shopping cart system that allows users to add products from the order form and manage multiple orders before final checkout.

## User Flow
1. **Order Form** → User fills out product details and clicks "Confirm Order"
2. **Add to Cart** → Order is added to cart and user is redirected to cart page
3. **Cart Page** → User can review, edit, or remove orders
4. **Checkout** → User proceeds to final payment and shipping

## Data Structure

### Cart Item
```typescript
interface CartItem {
  id: string                    // Unique cart item ID
  productData: {
    name: string
    brand: string
    url: string
    basePrice: number
    currency: string
  }
  orderDetails: {
    size: string
    quantity: number
    color: string
    specialInstructions: string
    customMeasurements: File | null
  }
  selectedQC: QualityControl | null
  shippingMethod: string
  addedAt: Date
  totalInPKR: number
  totalInSelectedCurrency: number
}
```

### Cart State
```typescript
interface CartState {
  items: CartItem[]
  selectedCurrency: string
  totalItems: number
  subtotalPKR: number
  subtotalSelectedCurrency: number
}
```

## Cart Page Components

### 1. Cart Header
- Page title: "Shopping Cart"
- Item count display
- Currency selector
- Clear cart button

### 2. Cart Items List
- Individual cart item cards
- Product information display
- Order details summary
- Price breakdown
- Edit/Remove actions

### 3. Cart Summary
- Total items count
- Subtotal in PKR
- Subtotal in selected currency
- Proceed to checkout button

### 4. Empty Cart State
- Empty cart illustration
- "Start Shopping" button
- Link back to homepage

## Features

### Core Functionality
- ✅ Add items to cart from order form
- ✅ View all cart items
- ✅ Edit existing cart items
- ✅ Remove items from cart
- ✅ Update quantities
- ✅ Change shipping methods
- ✅ Modify quality control options
- ✅ Currency conversion
- ✅ Clear entire cart

### User Experience
- ✅ Responsive design for mobile/desktop
- ✅ Real-time price updates
- ✅ Form validation
- ✅ Confirmation dialogs for destructive actions
- ✅ Persistent cart data (localStorage)
- ✅ Smooth transitions and animations

## Technical Implementation

### State Management
- Use React Context for cart state
- Local storage for persistence
- Real-time calculations

### Navigation
- Route: `/cart`
- Breadcrumb: Home → Cart
- Back button to previous page

### API Integration
- Cart operations (add, update, remove)
- Price calculations
- Currency conversion

## UI/UX Guidelines

### Visual Design
- Consistent with existing design system
- Clear visual hierarchy
- Intuitive action buttons
- Responsive grid layout

### Accessibility
- Screen reader support
- Keyboard navigation
- Clear focus states
- Descriptive alt text

### Performance
- Lazy loading for large carts
- Optimized re-renders
- Efficient state updates

## Success Metrics
- Cart abandonment rate
- Time to checkout
- User engagement with cart features
- Conversion rate from cart to checkout
