import { Coffee, Heart, Gift } from 'lucide-react'

export default function Support() {
  return (
    <div className="bg-navy-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center">
          <Coffee className="mx-auto h-12 w-12 text-gold-500" />
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy-700">Support This Project</h1>
          <p className="mt-3 text-navy-500">
            All content on China Policy Guide is — and will always be — 100% free.
            We built this to help expats navigate Chinese policies without language barriers.
            If this saved you time or money, a small tip means a lot.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* WeChat Pay */}
          <div className="rounded-lg bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 0 0 .168-.054l1.926-1.124a.798.798 0 0 1 .672-.078 10.7 10.7 0 0 0 2.858.39c.097 0 .193-.006.29-.01-.637-1.373-.99-2.898-.99-4.482 0-4.074 3.49-7.514 8.29-7.514.097 0 .193.006.29.01-.484-3.69-4.055-6.578-8.59-6.578zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .651-.52 1.18-1.162 1.18-.642 0-1.162-.529-1.162-1.18 0-.651.52-1.18 1.162-1.18zm5.812 0c.642 0 1.162.529 1.162 1.18 0 .651-.52 1.18-1.162 1.18-.642 0-1.162-.529-1.162-1.18 0-.651.52-1.18 1.162-1.18zm4.21 4.066c-3.818 0-6.91 2.826-6.91 6.31 0 3.485 3.092 6.311 6.91 6.311.708 0 1.39-.097 2.028-.272a.63.63 0 0 1 .532.062l1.402.817a.262.262 0 0 0 .134.043c.127 0 .23-.105.23-.234 0-.057-.023-.114-.038-.17l-.285-1.08a.472.472 0 0 1 .169-.528C23.099 20.508 24 18.972 24 17.367c0-3.484-3.092-6.31-6.91-6.31zm-2.294 3.79c.508 0 .92.42.92.935 0 .516-.412.935-.92.935-.508 0-.92-.42-.92-.935 0-.516.412-.935.92-.935zm4.587 0c.508 0 .92.42.92.935 0 .516-.412.935-.92.935-.508 0-.92-.42-.92-.935 0-.516.412-.935.92-.935z"/>
              </svg>
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold text-navy-700">WeChat Pay</h2>
            <p className="mt-1 text-sm text-navy-500">Scan to buy us a coffee</p>
            <img
              src="/weixinpay.png"
              alt="WeChat Pay QR Code"
              className="mx-auto mt-6 h-64 w-64 rounded-lg border border-navy-100 object-contain"
            />
          </div>

          {/* Alipay */}
          <div className="rounded-lg bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.7 13.9c-.8-.3-2.3-.9-3.9-1.5.4-1.1.7-2.3.9-3.5h-3.3V7.8h4V7h-4V4.3h-1.6c-.1 0-.2.1-.2.2V7h-4v.8h4v1.1h-3.3v.8h6.1c-.1.9-.3 1.7-.6 2.5-1.7-.5-3.5-1-5.1-1-1.7 0-3.2.4-4.2 1.3-1.1 1-1.6 2.4-1.6 3.9 0 2.9 2.2 4.9 5.2 4.9 2.1 0 4.2-1.1 5.8-3 .6.3 1.2.6 1.8.9.3.1.6.3.9.4l.5-1.5c-.4-.2-.9-.4-1.4-.6.3-.4.6-.8.8-1.3.4.2.8.3 1.1.5.4.2.7.3 1 .4l.6-1.6zm-9.8 3.1c-2 0-3.4-1.2-3.4-3 0-1.9 1.5-3 3.4-3 1.3 0 2.8.4 4.4.9-1.1 1.9-2.7 3.1-4.4 3.1z"/>
              </svg>
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold text-navy-700">Alipay</h2>
            <p className="mt-1 text-sm text-navy-500">Scan to support us</p>
            <img
              src="/alipay.jpg"
              alt="Alipay QR Code"
              className="mx-auto mt-6 h-64 w-64 rounded-lg border border-navy-100 object-contain"
            />
          </div>
        </div>

        {/* Why support */}
        <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-navy-700">Why Support Us?</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <Heart className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <p className="text-sm text-navy-600">Keep all content free for everyone, regardless of their financial situation</p>
            </div>
            <div className="flex items-start gap-3">
              <Coffee className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <p className="text-sm text-navy-600">Help us cover server and domain costs</p>
            </div>
            <div className="flex items-start gap-3">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" />
              <p className="text-sm text-navy-600">Motivate us to add more policies and keep data up to date</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-navy-400">
          Tips are voluntary. No payment is required to access any content on this site.
        </p>
      </div>
    </div>
  )
}
