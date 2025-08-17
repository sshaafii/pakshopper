import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import BrandStrip from '../components/BrandStrip'
import HowItWorks from '../components/HowItWorks'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BrandStrip />
      <HowItWorks />
      <Features />
      {/*<Pricing />*/}
      <Testimonials />
      {/*<FAQ />*/}
      <Footer />
    </main>
  )
}

