'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Eye, EyeOff } from 'lucide-react'

interface Country {
  name: string
  code: string
  dialCode: string
}

const countries: Country[] = [
  { name: 'Pakistan', code: 'PK', dialCode: '+92' },
  { name: 'United States', code: 'US', dialCode: '+1' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44' },
  { name: 'Canada', code: 'CA', dialCode: '+1' },
  { name: 'Australia', code: 'AU', dialCode: '+61' }
]

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SignUpPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState(countries[0].dialCode)
  const [country, setCountry] = useState('')
  const [referral, setReferral] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const handleBlur = (field: string) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const matched = countries.find((c) => value.startsWith(c.dialCode))
    if (matched) {
      setPhoneCode(matched.dialCode)
      value = value.slice(matched.dialCode.length)
    }
    setPhone(value.replace(/[^0-9]/g, ''))
  }

  const isPasswordValid = (pwd: string) => pwd.length >= 8 && /\d/.test(pwd)

  const passwordStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    if (score <= 1) return 'Weak'
    if (score === 2) return 'Medium'
    return 'Strong'
  }

  const strength = passwordStrength(password)
  const strengthColor =
    strength === 'Strong'
      ? 'text-green-600'
      : strength === 'Medium'
        ? 'text-yellow-600'
        : 'text-red-600'

  const isFormValid =
    fullName.trim().length > 0 &&
    emailRegex.test(email) &&
    isPasswordValid(password) &&
    confirmPassword === password &&
    phone.trim().length > 0 &&
    country.trim().length > 0 &&
    termsAccepted

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    alert('Account created (demo).')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <div className="container-custom py-10">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-soft space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={handleBlur('fullName')}
                className="input-field w-full"
              />
              {touched.fullName && !fullName && (
                <p className="text-sm text-red-600 mt-1">Full name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur('email')}
                className="input-field w-full"
              />
              {touched.email && !emailRegex.test(email) && (
                <p className="text-sm text-red-600 mt-1">Enter a valid email</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handleBlur('password')}
                  className="input-field w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.password && !isPasswordValid(password) && (
                <p className="text-sm text-red-600 mt-1">
                  Password must be at least 8 characters and include a number
                </p>
              )}
              {password && (
                <p className={`text-sm mt-1 ${strengthColor}`}>Strength: {strength}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleBlur('confirmPassword')}
                  className="input-field w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.confirmPassword && confirmPassword !== password && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex space-x-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="input-field w-32"
                  onBlur={handleBlur('phone')}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.dialCode}>
                      {c.code} {c.dialCode}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handleBlur('phone')}
                  className="input-field flex-1"
                />
              </div>
              {touched.phone && phone.trim().length === 0 && (
                <p className="text-sm text-red-600 mt-1">Enter a valid phone number</p>
              )}
            </div>

            {/* Country of Residence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country of Residence</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onBlur={handleBlur('country')}
                className="input-field w-full"
              >
                <option value="">Select country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {touched.country && !country && (
                <p className="text-sm text-red-600 mt-1">Country is required</p>
              )}
            </div>

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code / Invite Code <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className="input-field w-full"
              />
            </div>

            {/* Terms and CTA */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  onBlur={handleBlur('terms')}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to PakShopper’s{' '}
                  <Link href="#" className="text-primary-600 underline">
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="#" className="text-primary-600 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {touched.terms && !termsAccepted && (
                <p className="text-sm text-red-600">You must accept the terms</p>
              )}
              <p className="text-xs text-gray-500">We respect your privacy. No spam.</p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>

            {/* Alternative Sign Up Options */}
            <div className="pt-4 space-y-3">
              <button type="button" className="w-full input-field flex items-center justify-center">
                Sign up with Google
              </button>
              <button type="button" className="w-full input-field flex items-center justify-center">
                Sign up with Apple
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Secure account creation – all data encrypted.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SignUpPage

