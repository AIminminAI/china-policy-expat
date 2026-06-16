import { Shield } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: January 1, 2026</p>

        <div className="mt-8 space-y-8 text-navy-600 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">1. Information We Collect</h2>
            <p className="mt-2">We collect the following types of information when you use our service:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Account Information:</strong> Email address when you sign up for an account or newsletter.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, and general interaction patterns to improve our service.</li>
              <li><strong>Calculator Data:</strong> City, visa type, income range, and family information you provide to the subsidy calculator. This data is processed locally and not stored on our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">2. How We Use Your Information</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>To provide and maintain our service</li>
              <li>To send you policy alerts and newsletters you have opted into</li>
              <li>To improve our content and user experience</li>
              <li>To communicate important updates about our service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">3. Third-Party Services</h2>
            <p className="mt-2">We use the following third-party services:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Creem:</strong> For processing subscription payments. Creem handles your payment information securely and we do not store your credit card details.</li>
              <li><strong>Vercel:</strong> For hosting and deploying our application. Vercel may collect standard web analytics data.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">4. Data Retention</h2>
            <p className="mt-2">We retain your account information for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days. Usage data is anonymized after 90 days and retained for analytics purposes only.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">5. Your Rights</h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Export your data in a standard format</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">6. Contact Us</h2>
            <p className="mt-2">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-1">
              <a href="mailto:privacy@chinapolicyguide.com" className="text-gold-600 hover:underline">privacy@chinapolicyguide.com</a>
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-navy-400">
          <Shield className="h-4 w-4" />
          Your privacy matters to us.
        </div>
      </div>
    </div>
  )
}
