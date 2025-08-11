// pages/ai.tsx
import Head from "next/head";

export default function AiLeadMagnet() {
  return (
    <>
      <Head>
        <title>10 AI Automations That Save SMBs 10+ Hours/Week</title>
        <meta
          name="description"
          content="Free guide: 10 simple AI automations that help small businesses save time, cut costs, and work smarter."
        />
      </Head>

      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 px-4 py-16 text-white">
        <div className="max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            10 AI Automations That Save SMBs 10+ Hours/Week
          </h1>
          <p className="mb-10 text-lg text-blue-100">
            Discover how small businesses are using AI tools to save time,
            reduce repetitive work, and focus on what matters. Get real-life
            examples, step-by-step guides, and ready-to-use templates — all in
            one free guide.
          </p>

          <div className="mx-auto max-w-lg rounded-xl bg-white p-6 text-black shadow-xl">
            <h2 className="mb-4 text-center text-xl font-semibold">
              Get Your Free Guide
            </h2>

            <iframe
              src="https://buttondown.com/costa?as_embed=true"
              style={{
                border: "none",
                width: "100%",
                height: "320px",
              }}
              scrolling="no"
            ></iframe>

            <p className="mt-2 text-center text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          <div className="mt-16 text-left">
            <h3 className="mb-4 text-2xl font-semibold">
              What You’ll Learn Inside:
            </h3>
            <ul className="space-y-3 text-blue-100">
              <li>✅ Automate repetitive email tasks</li>
              <li>✅ Enrich leads automatically without manual entry</li>
              <li>✅ Turn blog posts into short promo videos</li>
              <li>✅ Create auto-generated meeting notes</li>
              <li>✅ Build a weekly performance digest</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
