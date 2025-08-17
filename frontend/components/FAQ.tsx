'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does PakShopper work?',
      answer: 'Simply paste the link of any Pakistani fashion product you want to buy. We\'ll handle the purchase, quality control, and shipping to your doorstep. You pay in your local currency and we take care of everything else.'
    },
    {
      question: 'What is the service fee?',
      answer: 'We charge a 5% service fee on the product value. This covers product sourcing, quality inspection, order management, and customer support. There are no hidden fees.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 7-14 business days depending on your location. Express shipping options are available for faster delivery. We\'ll provide tracking information once your package ships.'
    },
    {
      question: 'Do you offer quality control?',
      answer: 'Yes! We inspect every item before shipping and send you detailed photos. This ensures you receive exactly what you ordered and helps identify any issues before the package leaves Pakistan.'
    },
    {
      question: 'Can I combine multiple orders?',
      answer: 'Absolutely! Our consolidation service allows you to combine multiple orders into one shipment, saving you money on shipping costs. We\'ll hold your items and ship them together when you\'re ready.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely, and you\'ll be charged in your local currency with transparent exchange rates.'
    },
    {
      question: 'Do you offer tailoring services?',
      answer: 'Yes, we can arrange custom alterations and sizing adjustments for most clothing items. Just let us know your requirements when placing the order, and we\'ll coordinate with our trusted tailors.'
    },
    {
      question: 'What if I\'m not satisfied with my order?',
      answer: 'Customer satisfaction is our priority. If you\'re not happy with your order, contact us within 7 days of delivery. We\'ll work with you to resolve any issues or arrange a return.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about shopping with PakShopper. Can't find your answer? Contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card border border-gray-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help 24/7 via WhatsApp and email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="btn-secondary">
                View All FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ

