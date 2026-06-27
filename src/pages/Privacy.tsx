import { Shield } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700">Privacy Policy</h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: June 17, 2026</p>

        <div className="mt-8 space-y-8 text-navy-600 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">1. Introduction</h2>
            <p className="mt-2">ChinaPolicyGuide ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website at china-policy-expat.vercel.app.</p>
            <p className="mt-2">This policy complies with the General Data Protection Regulation (GDPR) for European users and the Personal Information Protection Law (PIPL) of the People's Republic of China for Chinese users.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">2. Information We Collect</h2>
            <p className="mt-2"><strong>Email Address (Optional):</strong> If you subscribe to our newsletter, we collect your email address to send you policy updates. This is completely optional — all content on the site is accessible without providing an email.</p>
            <p className="mt-2"><strong>Usage Data:</strong> We do not use third-party analytics tools. We do not track your browsing behavior, IP address, or device information.</p>
            <p className="mt-2"><strong>Donation Data:</strong> If you choose to donate via WeChat Pay or Alipay, the payment is processed entirely by those platforms. We do not see, store, or process your payment details.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">3. How We Use Your Information</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>To send you policy updates if you subscribe to our newsletter</li>
              <li>To improve our content based on general usage patterns (no individual tracking)</li>
              <li>To respond to your inquiries if you contact us</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">4. Data Storage</h2>
            <p className="mt-2"><strong>Vercel KV:</strong> Newsletter subscriber email addresses are stored in Vercel KV (a serverless key-value store) hosted on Vercel's infrastructure. Vercel data centers are located in the United States and other regions.</p>
            <p className="mt-2"><strong>No Payment Data:</strong> We do not store any payment information. Donations are processed entirely by WeChat Pay or Alipay on their respective platforms.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">5. Cookies</h2>
            <p className="mt-2">We use only essential cookies:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., remembering your cookie consent preference).</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> use advertising cookies, tracking pixels, or third-party analytics. No data is shared with advertisers.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">6. Your Rights Under GDPR</h2>
            <p className="mt-2">If you are a resident of the European Economic Area (EEA), you have the following rights:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:1317957931@qq.com" className="text-gold-600 hover:underline">1317957931@qq.com</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">7. Your Rights Under PIPL</h2>
            <p className="mt-2">If you are a resident of the People's Republic of China, under PIPL you have the right to:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Know and decide how your personal information is handled</li>
              <li>Query and copy your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Request transfer of your personal information</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:1317957931@qq.com" className="text-gold-600 hover:underline">1317957931@qq.com</a>.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">8. Cross-Border Data Transfer</h2>
            <p className="mt-2">As our services are hosted on Vercel, your personal data (email address if subscribed) may be transferred to and processed in countries outside of China, including the United States. We ensure that:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Data is stored on Vercel's secure infrastructure</li>
              <li>Data is only used for the purposes described in this policy</li>
              <li>You can request deletion at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">9. Data Retention</h2>
            <p className="mt-2">Newsletter subscriber email addresses are retained until you unsubscribe or request deletion. You can unsubscribe at any time using the unsubscribe link in our emails, or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">10. Children's Privacy</h2>
            <p className="mt-2">Our service is not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">11. Changes to This Policy</h2>
            <p className="mt-2">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">12. Contact Us</h2>
            <p className="mt-2">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-1">
              <a href="mailto:1317957931@qq.com" className="text-gold-600 hover:underline">1317957931@qq.com</a>
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-navy-400">
          <Shield className="h-4 w-4" />
          Your privacy is important to us.
        </div>
      </div>
    </div>
  )
}
