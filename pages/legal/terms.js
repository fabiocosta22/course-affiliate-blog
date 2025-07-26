import Container from "../../components/Container";

export default function TermsOfService() {
  return (
    <Container title="Terms of Service - CourseFinderHub">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-4">Last updated: July 25, 2025</p>
        <p className="mb-4">
          By using <strong>CourseFinderHub</strong>, you agree to the following
          terms:
        </p>
        <h2 className="mb-2 mt-6 text-xl font-semibold">1. Use of Content</h2>
        <p className="mb-4">
          You may share content for personal use. Reproduction without
          permission is not allowed.
        </p>
        <h2 className="mb-2 mt-6 text-xl font-semibold">2. Affiliate Links</h2>
        <p className="mb-4">
          We earn commissions from affiliate links — this supports our work and
          doesn’t cost you extra.
        </p>
        <h2 className="mb-2 mt-6 text-xl font-semibold">3. Accuracy</h2>
        <p className="mb-4">
          While we strive for accuracy, we don’t guarantee complete correctness.
          Always verify with the course provider.
        </p>
        <h2 className="mb-2 mt-6 text-xl font-semibold">
          4. Limitation of Liability
        </h2>
        <p>
          We are not liable for any outcomes resulting from using this site or
          linked courses.
        </p>
      </div>
    </Container>
  );
}
