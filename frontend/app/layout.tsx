import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../contexts/CartContext'

export const metadata: Metadata = {
  title: 'PakShopper - Your Trusted Pakistani Fashion Agent',
  description: 'Shop Pakistani clothing and lifestyle products with ease. Quality control, transparent pricing, and worldwide shipping.',
  keywords: 'Pakistani fashion, clothing, shopping agent, quality control, worldwide shipping',
  authors: [{ name: 'PakShopper Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

