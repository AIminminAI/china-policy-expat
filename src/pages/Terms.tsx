import { FileText } from 'lucide-react'

export default function Terms() {
  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700">Terms of Service</h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: June 17, 2026</p>

        <div className="mt-8 space-y-8 text-navy-600 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">1. Acceptance of Terms</h2>
            <p className="mt-2">By accessing or using ChinaPolicyGuide ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">2. Description of Service</h2>
            <p className="mt-2">ChinaPolicyGuide provides free information about Chinese government policies, subsidies, and regulations relevant to foreign expats living in China. The Service includes policy browsing and a subsidy calculator. All content is free. Optional donations are accepted but not required.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">3. Disclaimer — Not Legal Advice</h2>
            <div className="mt-2 rounded-lg border border-gold-300 bg-gold-50 p-4">
              <p className="font-semibold text-navy-700">Important:</p>
              <p className="mt-1">All policy information provided by ChinaPolicyGuide is for <strong>general reference and informational purposes only</strong>. It does not constitute legal, tax, immigration, or professional advice of any kind.</p>
              <p className="mt-2">Policy interpretations and eligibility requirements may vary based on individual circumstances, city-level implementations, and frequent regulatory changes. You should consult with qualified legal professionals or relevant government authorities before making any decisions based on the information provided.</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">4. Accuracy of Information</h2>
            <p className="mt-2">While we strive to provide accurate and up-to-date policy information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Service for any purpose.</p>
            <p className="mt-2">Chinese government policies are subject to frequent changes, and local implementations may differ from national-level policies. Any reliance you place on such information is therefore strictly at your own risk.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">5. Donations</h2>
            <p className="mt-2">All content on ChinaPolicyGuide is free. We accept voluntary donations via WeChat Pay and Alipay. Donations are non-refundable except in cases of accidental duplicate payments. If you accidentally donated twice, please contact us within 7 days for a refund of the duplicate.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">6. Acceptable Use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Scrape, crawl, or otherwise extract data from the Service through automated means</li>
              <li>Reproduce, distribute, or commercially exploit the content without our written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">7. Intellectual Property</h2>
            <p className="mt-2">All content, features, and functionality of the Service — including but not limited to text, graphics, logos, and software — are owned by ChinaPolicyGuide and are protected by international copyright, trademark, and other intellectual property laws.</p>
            <p className="mt-2">Government policy documents referenced on our platform are public information and remain the property of their respective issuing authorities.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">8. Limitation of Liability</h2>
            <p className="mt-2">To the maximum extent permitted by applicable law:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied</li>
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Service</li>
              <li>We shall not be liable for any decisions made based on the policy information provided through the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">9. Changes to These Terms</h2>
            <p className="mt-2">We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on this page with a revised "Last updated" date. Your continued use of the Service after changes are posted constitutes acceptance of the modified Terms.</p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-navy-700">10. Contact Us</h2>
            <p className="mt-2">If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-1">
              <a href="mailto:1317957931@qq.com" className="text-gold-600 hover:underline">1317957931@qq.com</a>
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm text-navy-400">
          <FileText className="h-4 w-4" />
          By using our service, you agree to these terms.
        </div>
      </div>
    </div>
  )
}
