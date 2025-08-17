import { Camera, Users, DollarSign, Scissors, Package, Headphones } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Quality Control Photos',
      description: 'Receive detailed QC photos before shipping to ensure you get exactly what you ordered.',
      color: 'primary'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Trusted Support',
      description: 'Our experienced team provides personalized assistance throughout your shopping journey.',
      color: 'accent'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Transparent Pricing',
      description: 'No hidden fees. Clear breakdown of product cost, service fee, and shipping charges.',
      color: 'primary'
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Tailoring Options',
      description: 'Custom alterations and sizing adjustments available for perfect fit.',
      color: 'accent'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Consolidated Shipping',
      description: 'Save money by combining multiple orders into one shipment.',
      color: 'primary'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: '24/7 Customer Care',
      description: 'Round-the-clock support via WhatsApp and email for all your queries.',
      color: 'accent'
    }
  ]

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Shop With <span className="text-gradient">PakShopper</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make shopping Pakistani fashion simple, secure, and satisfying with our comprehensive service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-8 text-center group">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                feature.color === 'primary' 
                  ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-200' 
                  : 'bg-accent-100 text-accent-600 group-hover:bg-accent-200'
              } transition-colors duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-600 mb-8">
            Trusted by customers from over 25 countries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">🇬🇧 UK</div>
            <div className="text-2xl font-bold text-gray-400">🇨🇦 Canada</div>
            <div className="text-2xl font-bold text-gray-400">🇦🇺 Australia</div>
            <div className="text-2xl font-bold text-gray-400">🇺🇸 USA</div>
            <div className="text-2xl font-bold text-gray-400">🇦🇪 UAE</div>
            <div className="text-2xl font-bold text-gray-400">🇸🇦 Saudi Arabia</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

