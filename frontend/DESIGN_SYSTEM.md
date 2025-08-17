# PakShopper Design System

## 🎨 Brand Identity

### Logo
- **Primary Logo**: Green shopping bag icon with "PakShopper" text
- **Colors**: Primary green (#00A652) and white
- **Usage**: Always maintain clear space around logo (minimum 1x logo height)

### Brand Colors

#### Primary Palette
```css
--primary-50: #f0fdf4   /* Lightest green - backgrounds */
--primary-100: #dcfce7  /* Very light green - subtle backgrounds */
--primary-200: #bbf7d0  /* Light green - borders, dividers */
--primary-300: #86efac  /* Medium light green - icons, accents */
--primary-400: #4ade80  /* Medium green - secondary actions */
--primary-500: #00A652  /* Main brand green - primary actions */
--primary-600: #028A3D  /* Dark green - hover states */
--primary-700: #15803d  /* Darker green - text on light backgrounds */
--primary-800: #166534  /* Very dark green - headings */
--primary-900: #14532d  /* Darkest green - large text blocks */
```

#### Accent Palette
```css
--accent-50: #fefce8   /* Lightest gold - backgrounds */
--accent-100: #fef9c3  /* Very light gold - subtle backgrounds */
--accent-200: #fef08a  /* Light gold - borders, dividers */
--accent-300: #fde047  /* Medium light gold - icons, accents */
--accent-400: #F2C94C  /* Main gold accent - highlights */
--accent-500: #eab308  /* Medium gold - secondary actions */
--accent-600: #ca8a04  /* Dark gold - hover states */
--accent-700: #a16207  /* Darker gold - text on light backgrounds */
--accent-800: #854d0e  /* Very dark gold - headings */
--accent-900: #713f12  /* Darkest gold - large text blocks */
```

#### Neutral Palette
```css
--gray-50: #f9fafb    /* Lightest gray - backgrounds */
--gray-100: #f3f4f6   /* Very light gray - subtle backgrounds */
--gray-200: #e5e7eb   /* Light gray - borders, dividers */
--gray-300: #d1d5db   /* Medium light gray - disabled states */
--gray-400: #9ca3af   /* Medium gray - placeholder text */
--gray-500: #6b7280   /* Medium gray - secondary text */
--gray-600: #4b5563   /* Dark gray - body text */
--gray-700: #374151   /* Darker gray - headings */
--gray-800: #1f2937   /* Very dark gray - large text blocks */
--gray-900: #111827   /* Darkest gray - primary headings */
```

### Typography

#### Font Families
```css
/* Display Font - Headings */
font-family: 'Poppins', 'Inter', system-ui, sans-serif;

/* Body Font - Body text */
font-family: 'Inter', 'Poppins', 'Nunito', system-ui, sans-serif;
```

#### Type Scale
```css
/* Display Headings */
.text-7xl { font-size: 4.5rem; line-height: 1.1; }  /* Hero headlines */
.text-6xl { font-size: 3.75rem; line-height: 1.1; } /* Page headlines */
.text-5xl { font-size: 3rem; line-height: 1.2; }    /* Section headlines */
.text-4xl { font-size: 2.25rem; line-height: 1.2; } /* Subsection headlines */

/* Body Text */
.text-2xl { font-size: 1.5rem; line-height: 1.5; }  /* Large body text */
.text-xl { font-size: 1.25rem; line-height: 1.6; }  /* Body text */
.text-lg { font-size: 1.125rem; line-height: 1.6; } /* Medium body text */
.text-base { font-size: 1rem; line-height: 1.6; }   /* Default body text */
.text-sm { font-size: 0.875rem; line-height: 1.5; } /* Small text */
.text-xs { font-size: 0.75rem; line-height: 1.4; }  /* Caption text */
```

#### Font Weights
```css
--font-light: 300      /* Light text */
--font-normal: 400     /* Regular text */
--font-medium: 500     /* Medium text */
--font-semibold: 600   /* Semibold text */
--font-bold: 700       /* Bold text */
--font-extrabold: 800  /* Extra bold text */
```

## 🧩 Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-medium hover:shadow-large;
}
```

#### Secondary Button
```css
.btn-secondary {
  @apply bg-white hover:bg-gray-50 text-primary-600 font-semibold py-3 px-6 rounded-lg border-2 border-primary-500 transition-all duration-200 transform hover:scale-105 shadow-soft;
}
```

#### Accent Button
```css
.btn-accent {
  @apply bg-accent-400 hover:bg-accent-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-medium;
}
```

#### Button Sizes
```css
/* Small */
.btn-sm { @apply py-2 px-4 text-sm; }

/* Medium (default) */
.btn-md { @apply py-3 px-6 text-base; }

/* Large */
.btn-lg { @apply py-4 px-8 text-lg; }

/* Extra Large */
.btn-xl { @apply py-5 px-10 text-xl; }
```

### Form Elements

#### Input Fields
```css
.input-field {
  @apply w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none;
}
```

#### Input States
```css
/* Default */
.input-field { @apply border-gray-200; }

/* Focus */
.input-field:focus { @apply border-primary-500 ring-2 ring-primary-200; }

/* Error */
.input-field.error { @apply border-red-500 ring-2 ring-red-200; }

/* Success */
.input-field.success { @apply border-green-500 ring-2 ring-green-200; }

/* Disabled */
.input-field:disabled { @apply bg-gray-100 cursor-not-allowed; }
```

### Cards

#### Basic Card
```css
.card {
  @apply bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1;
}
```

#### Card Variants
```css
/* Elevated Card */
.card-elevated {
  @apply shadow-large hover:shadow-xl;
}

/* Bordered Card */
.card-bordered {
  @apply border border-gray-200;
}

/* Interactive Card */
.card-interactive {
  @apply cursor-pointer hover:shadow-medium hover:-translate-y-1;
}
```

### Shadows

#### Shadow Scale
```css
--shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
--shadow-medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-large: 0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 60px -10px rgba(0, 0, 0, 0.2), 0 30px 40px -5px rgba(0, 0, 0, 0.1);
```

## 🎭 Animations & Transitions

### Duration Scale
```css
--duration-75: 75ms    /* Micro interactions */
--duration-100: 100ms  /* Quick transitions */
--duration-200: 200ms  /* Standard transitions */
--duration-300: 300ms  /* Smooth transitions */
--duration-500: 500ms  /* Deliberate animations */
--duration-700: 700ms  /* Long animations */
--duration-1000: 1000ms /* Extended animations */
```

### Easing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Animation Classes
```css
/* Fade In */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Slide Up */
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

/* Bounce Gentle */
.animate-bounce-gentle {
  animation: bounceGentle 2s infinite;
}
```

## 📱 Responsive Breakpoints

### Breakpoint System
```css
/* Mobile First */
--sm: 640px   /* Small devices */
--md: 768px   /* Medium devices */
--lg: 1024px  /* Large devices */
--xl: 1280px  /* Extra large devices */
--2xl: 1536px /* 2X large devices */
```

### Container Max Widths
```css
.container-custom {
  @apply max-w-7xl mx-auto; /* 1280px */
}

.container-sm {
  @apply max-w-3xl mx-auto; /* 768px */
}

.container-md {
  @apply max-w-4xl mx-auto; /* 896px */
}

.container-lg {
  @apply max-w-5xl mx-auto; /* 1024px */
}
```

## 🎯 Spacing System

### Spacing Scale
```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
--space-32: 8rem     /* 128px */
```

### Section Padding
```css
.section-padding {
  @apply py-16 px-4 sm:px-6 lg:px-8;
}

.section-padding-sm {
  @apply py-8 px-4 sm:px-6 lg:px-8;
}

.section-padding-lg {
  @apply py-24 px-4 sm:px-6 lg:px-8;
}
```

## 🔧 Utility Classes

### Layout Utilities
```css
.container-custom { @apply max-w-7xl mx-auto; }
.text-gradient { @apply bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent; }
.bg-pattern { background-image: radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0); background-size: 20px 20px; }
```

### Interactive States
```css
.hover-lift { @apply hover:-translate-y-1 hover:shadow-medium transition-all duration-300; }
.hover-scale { @apply hover:scale-105 transition-transform duration-200; }
.hover-glow { @apply hover:shadow-large transition-shadow duration-200; }
```

## 📋 Usage Guidelines

### Color Usage
- **Primary Green**: Use for primary actions, links, and brand elements
- **Deep Green**: Use for hover states and secondary brand elements
- **Gold Accent**: Use sparingly for highlights and special elements
- **Gray Scale**: Use for text, borders, and neutral UI elements

### Typography Usage
- **Poppins**: Use for all headings (h1-h6) and display text
- **Inter**: Use for body text, buttons, and UI elements
- **Nunito**: Use as fallback for both font families

### Component Usage
- **Buttons**: Use primary for main actions, secondary for alternative actions
- **Cards**: Use for content containers, feature highlights, and testimonials
- **Forms**: Use consistent styling with proper focus states
- **Shadows**: Use soft shadows for subtle depth, large shadows for emphasis

### Accessibility
- **Color Contrast**: Ensure minimum 4.5:1 ratio for text
- **Focus States**: Always provide visible focus indicators
- **Semantic HTML**: Use proper heading hierarchy and landmarks
- **Screen Readers**: Include proper ARIA labels and descriptions

---

This design system ensures consistency, accessibility, and maintainability across the PakShopper frontend application.

