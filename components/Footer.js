import Link from "next/link";

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 transition hover:text-gray-600"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="mx-auto mb-8 flex w-full max-w-2xl flex-col items-start justify-center">
      <hr className="mb-8 w-full border border-gray-200" />

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-8 text-center text-sm sm:grid-cols-3">
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/"
            className="text-gray-500 transition hover:text-gray-600"
          >
            Home
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/legal/privacy"
            className="text-gray-500 transition hover:text-gray-600"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/legal/terms"
            className="text-gray-500 transition hover:text-gray-600"
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Link
            href="/legal/affiliate"
            className="text-gray-500 transition hover:text-gray-600"
          >
            Affiliate Disclaimer
          </Link>
        </div>
      </div>

      <p className="w-full text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CourseFinderHub. All rights reserved.
      </p>
    </footer>
  );
}
