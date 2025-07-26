import Container from '../../components/Container'

export default function TermsOfService() {
  return (
    <Container title="Terms of Service - CourseFinderHub">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: July 25, 2025</p>
        <p className="mb-4">
          By using <strong>CourseFinderHub</strong>, you agree to the following terms:
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Content</h2>
        <p className="mb-4">
          You may share content for personal use. Reproduction without permission is not allowed.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Affiliate Links</h2>
        <p className="mb-4">
          We earn commissions from affiliate links — this supports our work and doesn’t cost you extra.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Accuracy</h2>
        <p className="mb-4">
          While we strive for accuracy, we don’t guarantee complete correctness. Always verify with the course provider.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p>
          We are not liable for any outcomes resulting from using this site or linked courses.
        </p>
      </div>
    </Container>
  )
}
