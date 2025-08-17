# PakShopper Frontend

A professional, responsive frontend design for PakShopper.com - your trusted purchasing agent for Pakistani clothing and lifestyle products.

## 🎨 Design System

### Brand Colors
- **Primary Green**: `#00A652` - Main brand color
- **Deep Green**: `#028A3D` - Secondary brand color  
- **Gold Accent**: `#F2C94C` - Highlight color
- **White**: `#FFFFFF` - Background and text
- **Gray Scale**: Various shades for text and UI elements

### Typography
- **Display Font**: Poppins (Headings)
- **Body Font**: Inter (Body text)
- **Fallback**: Nunito, system-ui, sans-serif

### Component Library
- **Buttons**: Primary, Secondary, and Accent variants
- **Cards**: Soft shadows with hover effects
- **Inputs**: Focused states with brand colors
- **Animations**: Subtle hover effects and transitions

## 🚀 Features

### Core Pages
- **Landing Page**: Hero section, features, how it works, pricing, testimonials
- **Contact Page**: Contact form with WhatsApp integration
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization

### Key Sections
- **Hero**: Product link input with strong CTA
- **Features**: 6 key benefits with icons
- **Brand Strip**: Pakistani fashion brands showcase
- **How It Works**: 5-step process explanation
- **Pricing**: Transparent cost breakdown
- **Testimonials**: Customer reviews from different countries
- **FAQ**: Expandable Q&A format

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Responsive**: Mobile-first design

## 📱 Responsive Design

- **Mobile**: Optimized for small screens (320px+)
- **Tablet**: Enhanced layout for medium screens (768px+)
- **Desktop**: Full-featured experience (1024px+)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pakshopper/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Landing page
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation component
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features grid
│   ├── BrandStrip.tsx    # Brand showcase
│   ├── HowItWorks.tsx    # Process explanation
│   ├── Pricing.tsx       # Pricing breakdown
│   ├── Testimonials.tsx  # Customer reviews
│   ├── FAQ.tsx           # FAQ section
│   └── Footer.tsx        # Footer component
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎯 Design Principles

### User Experience
- **Intuitive Navigation**: Clear information hierarchy
- **Trust Building**: Customer testimonials and transparent pricing
- **Mobile First**: Optimized for mobile users
- **Accessibility**: WCAG 2.1 AA compliance

### Visual Design
- **Cultural Alignment**: Pakistani fashion aesthetics
- **Modern Appeal**: Clean, professional interface
- **Brand Consistency**: Unified color scheme and typography
- **Visual Hierarchy**: Clear content organization

## 🔧 Customization

### Colors
Modify colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#00A652', // Main brand green
    600: '#028A3D', // Deep green
  },
  accent: {
    400: '#F2C94C', // Gold accent
  }
}
```

### Typography
Update fonts in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'Poppins', 'Nunito', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
}
```

### Components
All components are modular and can be easily customized:
- Modify component props for different content
- Update styling classes for visual changes
- Add new sections by creating new components

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Core functionality works in older browsers

## 🚀 Performance

- **Optimized Images**: Lazy loading and optimization
- **Minimal JavaScript**: Lightweight interactions
- **CSS Optimization**: Purged unused styles
- **Fast Loading**: Optimized bundle sizes

## 🔒 Security

- **Input Validation**: Form validation and sanitization
- **Secure Headers**: Next.js security features
- **HTTPS Ready**: Production-ready security

## 📈 Analytics & SEO

- **Meta Tags**: Optimized for search engines
- **Structured Data**: Ready for rich snippets
- **Performance Metrics**: Core Web Vitals optimized
- **Accessibility**: Screen reader friendly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 📞 Support

For questions or support:
- **Email**: hello@pakshopper.com
- **WhatsApp**: +92 300 1234567
- **Office**: Karachi, Pakistan

---

**PakShopper** - Your trusted Pakistani fashion agent worldwide.

