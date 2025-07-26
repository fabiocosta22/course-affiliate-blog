import Container from "../../components/Container";

export default function AffiliateDisclaimer() {
  return (
    <Container title="Affiliate Disclaimer - CourseFinderHub">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Affiliate Disclaimer</h1>
        <p className="mb-4">
          Some links on <strong>CourseFinderHub</strong> are affiliate links.
        </p>
        <p className="mb-4">
          This means we may earn a commission if you click a link and make a
          purchase — at no extra cost to you.
        </p>
        <p>
          We only recommend tools and courses that we truly believe are valuable
          and worth your time.
        </p>
      </div>
    </Container>
  );
}
