import { Check, Info } from 'lucide-react'

const Pricing = () => {
  const pricingDetails = [
    {
      title: 'Agent Service Fee',
      amount: '5%',
      description: 'Of product value',
      details: ['Product sourcing', 'Quality inspection', 'Order management', 'Customer support']
    },
    {
      title: 'Shipping Costs',
      amount: 'Variable',
      description: 'Based on weight & destination',
      details: ['International shipping', 'Package consolidation', 'Customs handling', 'Tracking included']
    },
    {
      title: 'Additional Services',
      amount: 'Optional',
      description: 'As requested',
      details: ['Tailoring & alterations', 'Express shipping', 'Insurance coverage', 'Special packaging']
    }
  ]

  const exampleCalculation = {
    productValue: 5000,
    serviceFee: 250,
    shipping: 1500,
    total: 6750
  }

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. We believe in complete transparency so you know exactly what you're paying for.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingDetails.map((item, index) => (
            <div key={index} className="card p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {item.amount}
                </span>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
              
              <ul className="text-left space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Example Calculation */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Example Calculation
            </h3>
            <p className="text-gray-600">
              Here's how our pricing works for a typical order
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Product Value (PKR)</span>
                <span className="font-semibold">₨{exampleCalculation.productValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Service Fee (5%)</span>
                <span className="font-semibold text-primary-600">₨{exampleCalculation.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-primary-600">₨{exampleCalculation.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-t-2 border-primary-200">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">₨{exampleCalculation.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">
              All prices in Pakistani Rupees (PKR). Convert to your local currency at checkout.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing

