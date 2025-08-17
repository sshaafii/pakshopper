import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FAQ from '../../components/FAQ'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-16">
        <section className="bg-gradient-to-br from-primary-50 to-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about using PakShopper.
            </p>
          </div>
        </section>

        <FAQ showViewAll={false} />
      </main>

      <Footer />
    </div>
  )
}
