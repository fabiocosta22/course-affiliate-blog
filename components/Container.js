import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import CookieConsent from "react-cookie-consent";

const baseUrl = "https://www.coursefinderhub.com";

export default function Container(props) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "CourseFinderHub – Curated Course Reviews",
    description: `Honest, AI-powered reviews of top online courses to help you learn faster and better.`,
    type: "website",
    image: "/site.png",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={meta.description} />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <link rel="canonical" href={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="CourseFinderHub" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main id="skip" className="px-4">
        {children}
        <Footer />
      </main>

      {/* ✅ Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="coursefinderhub_cookie_consent"
        style={{
          background: "#1F2937", // Tailwind gray-800
          color: "#F9FAFB", // Tailwind gray-50
          fontSize: "14px",
          zIndex: 9999,
        }}
        buttonStyle={{
          background: "#2563EB", // Tailwind blue-600
          color: "#ffffff",
          borderRadius: "6px",
          padding: "10px 16px",
          fontSize: "14px",
        }}
        expires={150}
      >
        We use cookies to enhance your experience and analyze site traffic.{" "}
        <a
          href="/legal/privacy"
          className="text-white underline hover:text-blue-300"
        >
          Learn more
        </a>
        .
      </CookieConsent>
    </>
  );
}
