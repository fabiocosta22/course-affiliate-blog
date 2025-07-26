import Container from '../../components/Container'

export default function PrivacyPolicy() {
  return (
    <Container title="Privacy Policy - CourseFinderHub">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last updated: July 25, 2025</p>
        <p className="mb-4">
          At <strong>CourseFinderHub</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name and email if you subscribe to our newsletter. We also collect anonymous usage data using tools like Google Analytics.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          To improve our site, deliver newsletters, and monitor engagement. We never sell your data.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance your experience. You can manage these in your browser settings.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Affiliate Disclosure</h2>
        <p className="mb-4">
          We may earn a commission on affiliate links, at no extra cost to you.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
        <p className="mb-4">
          Services like Notion, Google Analytics, and affiliate networks may also collect data.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p>
          You can request to access or delete your data by contacting us at{' '}
          <a href="mailto:hello@coursefinderhub.com" className="text-blue-600 underline">hello@coursefinderhub.com</a>.
        </p>
      </div>
    </Container>
  )
}
