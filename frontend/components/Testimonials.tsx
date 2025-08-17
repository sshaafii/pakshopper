import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      location: 'London, UK',
      country: '🇬🇧',
      rating: 5,
      text: 'PakShopper made buying Pakistani clothes so easy! The quality control photos gave me peace of mind, and the shipping was faster than expected. Highly recommend!',
      avatar: 'SA'
    },
    {
      name: 'Fatima Khan',
      location: 'Toronto, Canada',
      country: '🇨🇦',
      rating: 5,
      text: 'I was skeptical at first, but PakShopper exceeded my expectations. The team was incredibly helpful, and I got my beautiful Maria B dress in perfect condition.',
      avatar: 'FK'
    },
    {
      name: 'Aisha Rahman',
      location: 'Dubai, UAE',
      country: '🇦🇪',
      rating: 5,
      text: 'Finally found a reliable way to shop Pakistani fashion! The consolidation service saved me money, and the customer support is outstanding.',
      avatar: 'AR'
    },
    {
      name: 'Zara Malik',
      location: 'Melbourne, Australia',
      country: '🇦🇺',
      rating: 5,
      text: 'PakShopper is a game-changer! I can now access all my favorite Pakistani brands without worrying about international shipping issues.',
      avatar: 'ZM'
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers worldwide who trust PakShopper for their Pakistani fashion needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-6 relative">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary-200">
                <Quote className="w-6 h-6" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-600">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </span>
                    <span className="text-lg">{testimonial.country}</span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">Average Rating</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">500+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

