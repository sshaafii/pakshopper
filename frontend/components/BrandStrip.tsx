const BrandStrip = () => {
  const brands = [
    { name: 'Khaadi', logo: 'K' },
    { name: 'Maria B', logo: 'MB' },
    { name: 'Sapphire', logo: 'S' },
    { name: 'Gul Ahmed', logo: 'GA' },
    { name: 'Alkaram', logo: 'A' },
    { name: 'Chen One', logo: 'C1' },
    { name: 'J.', logo: 'J' },
    { name: 'Bonanza', logo: 'B' },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Trusted Pakistani Fashion Brands
          </h3>
          <p className="text-sm text-gray-500">
            We source from the most reputable brands in Pakistan
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white rounded-lg shadow-soft flex items-center justify-center mb-2 group-hover:shadow-medium transition-all duration-300">
                <span className="text-xl font-bold text-primary-600">
                  {brand.logo}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandStrip

