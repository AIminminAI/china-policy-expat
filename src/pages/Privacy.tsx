import { Shield } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: June 16, 2026</p>

        <div className="mt-8 space-y-8 text-navy-600 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">1. Information We Collect</h2>
            <p className="mt-2">We collect the following types of information when you use our service:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Account Information:</strong> Email address when you sign up for an account or newsletter.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, and general interaction patterns to improve our service.</li>
              <li><strong>Calculator Data:</strong> City, visa type, income range, and family information you provide to the subsidy calculator. This data is processed locally in your browser and not stored on our servers.</li>
              <li><strong>Payment Information:</strong> When you subscribe to our Pro plan, your payment is processed by Creem. We do not store your credit card details — Creem handles all payment data securely.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">2. How We Use Your Information</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>To provide and maintain our service</li>
              <li>To send you policy alerts and newsletters you have opted into</li>
              <li>To process subscription payments and manage your account</li>
              <li>To improve our content and user experience</li>
              <li>To communicate important updates about our service</li>
            </ul>
            <p className="mt-2">We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">3. Where Your Data Is Stored</h2>
            <p className="mt-2">Your data is stored with the following service providers:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Vercel KV:</strong> Subscriber email addresses and subscription status are stored in Vercel KV (a serverless key-value store) hosted on Vercel's infrastructure. Vercel data centers are located in the United States and other regions.</li>
              <li><strong>Creem:</strong> Payment and billing information is processed and stored by Creem in accordance with their privacy policy. Creem may store data on servers outside of China.</li>
              <li><strong>Vercel (Hosting):</strong> Our application is hosted on Vercel's platform, which may collect standard web analytics data (IP addresses, browser type, etc.) through server logs.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">4. Cross-Border Data Transfers</h2>
            <p className="mt-2">As our services are hosted on Vercel and use Creem for payments, your personal data may be transferred to and processed in countries outside of China, including the United States. We ensure that:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Data transfers are conducted in compliance with applicable data protection laws</li>
              <li>Our service providers maintain appropriate security measures</li>
              <li>For users protected by China's Personal Information Protection Law (PIPL), we rely on your consent for cross-border transfers of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">5. Data Retention</h2>
            <p className="mt-2">We retain your account information for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days. Usage data is anonymized after 90 days and retained for analytics purposes only. Payment records are retained as required by applicable financial regulations.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">6. Cookies and Tracking</h2>
            <p className="mt-2">We use minimal cookies and tracking technologies:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., session management, theme preference).</li>
              <li><strong>Analytics:</strong> We may use privacy-respecting analytics to understand how our service is used. No personally identifiable information is collected through analytics.</li>
            </ul>
            <p className="mt-2">You can control cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of our service.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">7. Your Rights</h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used, machine-readable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time, without affecting the lawfulness of processing based on consent before withdrawal</li>
              <li><strong>Object:</strong> Object to the processing of your personal data for direct marketing purposes</li>
              <li><strong>Opt Out:</strong> Opt out of marketing communications at any time via the unsubscribe link in our emails</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-navy-700 mt-4">GDPR Rights (EU/EEA Users)</h3>
            <p className="mt-2">If you are a resident of the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR), including:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>The right to lodge a complaint with your local supervisory authority</li>
              <li>The right to restrict processing of your personal data in certain circumstances</li>
              <li>The right not to be subject to decisions based solely on automated processing</li>
            </ul>

            <h3 className="font-heading text-lg font-semibold text-navy-700 mt-4">PIPL Rights (China Users)</h3>
            <p className="mt-2">If you are a user in China, you have additional rights under the Personal Information Protection Law (PIPL), including:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>The right to know the purpose, method, and scope of personal information processing</li>
              <li>The right to refuse targeted advertising and automated decision-making</li>
              <li>The right to request deletion of your personal information when the processing purpose has been achieved or is no longer necessary</li>
              <li>The right to file a complaint with the Cyberspace Administration of China (CAC) or relevant authorities</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">8. Data Security</h2>
            <p className="mt-2">We implement appropriate technical and organizational measures to protect your personal data, including:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Encryption in transit (HTTPS/TLS) for all data communications</li>
              <li>Secure storage using Vercel KV with access controls</li>
              <li>Webhook signature verification for payment processing</li>
              <li>Regular security reviews of our codebase</li>
            </ul>
            <p className="mt-2">While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">9. Children's Privacy</h2>
            <p className="mt-2">Our service is not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal data from a child under 16, we will take steps to delete such information promptly.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">10. Changes to This Policy</h2>
            <p className="mt-2">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">11. Contact Us</h2>
            <p className="mt-2">If you have any questions about this Privacy Policy, wish to exercise your data rights, or need to report a privacy concern, please contact us at:</p>
            <p className="mt-1">
              <a href="mailto:privacy@china-policy-expat.vercel.app" className="text-gold-600 hover:underline">privacy@china-policy-expat.vercel.app</a>
            </p>
            <p className="mt-2">We will respond to your request within 30 days. For users in the EU/EEA, we will respond without undue delay and within one month as required by the GDPR.</p>
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
