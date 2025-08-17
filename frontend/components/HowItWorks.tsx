import { Link, CreditCard, Camera, Package, Truck } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Link className="w-8 h-8" />,
      title: 'Paste Product Link',
      description: 'Simply copy and paste the URL of any Pakistani fashion product you want to buy.',
      color: 'primary'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Checkout & Payment',
      description: 'Pay in your local currency with secure payment methods. We handle the rest.',
      color: 'accent'
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Quality Control & Photos',
      description: 'We inspect your items and send you detailed photos before shipping.',
      color: 'primary'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Consolidation',
      description: 'Multiple orders? We combine them into one shipment to save you money.',
      color: 'accent'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Worldwide Shipping',
      description: 'Your package is carefully packed and shipped to your doorstep.',
      color: 'primary'
    }
  ]

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-gradient">PakShopper</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shopping Pakistani fashion has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-primary-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Step Number */}
                <div className="w-12 h-12 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary-600 shadow-medium">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  step.color === 'primary' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-accent-100 text-accent-600'
                }`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-soft p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Shopping?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers who trust PakShopper for their Pakistani fashion needs.
            </p>
            <button className="btn-primary text-lg px-8">
              Start Your First Order
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

