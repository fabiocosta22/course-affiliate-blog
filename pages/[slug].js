// pages/[slug].js
import BlogLayout from "../layouts/BlogLayout";
import { getNotionData, getPage, getBlocks } from "../lib/getNotionData";
import { RenderBlocks } from "../components/ContentBlocks";
import Link from "next/link";

const databaseId = process.env.NOTION_DATABASE_ID;

export default function Post({ page, blocks, relatedPosts }) {
  if (!page || !blocks) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  const title = page.properties.Post.title[0].plain_text;
  const description =
    page.properties.Description?.rich_text[0]?.plain_text || "";
  const image = page.properties["CoverImage"]?.files?.[0];
  const imageUrl =
    image?.type === "file" ? image.file.url : image?.external?.url;
  const ctaLink = page.properties?.URL?.url || "#";
  const category = page.properties?.Category?.select?.name || "Course";
  const readingTime = page.properties?.["Reading Time"]?.number || 5;

  return (
    <BlogLayout data={page} content={blocks}>
      <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex space-x-2 text-gray-500">
            <li>
              <Link href="/">
                <a className="hover:text-blue-600">Home</a>
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/courses">
                <a className="hover:text-blue-600">Courses</a>
              </Link>
            </li>
            <li>/</li>
            <li className="max-w-xs truncate font-medium text-gray-900 sm:max-w-md">
              {title}
            </li>
          </ol>
        </nav>

        {/* Category Tag & Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {category}
          </span>
          <span className="text-sm text-gray-500">{readingTime} min read</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">
            Updated{" "}
            {new Date(page.last_edited_time).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Hero Section */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mx-auto mb-6 max-w-3xl text-lg text-gray-600">
              {description}
            </p>
          )}

          {/* Primary CTA */}
          {ctaLink !== "#" && (
            <div className="mb-8">
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                <span>🚀 Enroll Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <p className="mt-2 text-sm text-gray-500">
                * This post contains affiliate links. We may earn a commission
                at no extra cost to you.
              </p>
            </div>
          )}
        </header>

        {/* Hero Image */}
        {imageUrl && (
          <div className="relative mb-12 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={imageUrl}
              alt={title}
              className="h-64 w-full object-cover sm:h-80 md:h-96"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg prose-blue mx-auto max-w-none">
          <RenderBlocks blocks={blocks} />
        </div>

        {/* Bottom CTA Section */}
        {ctaLink !== "#" && (
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Ready to Start Your Learning Journey?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              Take the next step in your career with one of these carefully
              selected courses. Your future self will thank you!
            </p>
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
            >
              <span>🎯 Start Learning Today</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts?.length > 0 && (
          <div className="mt-20 border-t border-gray-200 pt-10">
            <h3 className="mb-8 text-2xl font-bold text-gray-900">
              Related Courses & Guides
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/${post.slug}`}>
                  <a className="group block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md">
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                      {post.title}
                    </h4>
                    <div className="mt-3 flex items-center text-sm font-medium text-blue-600">
                      <span>Read more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author/Disclaimer */}
        <div className="mt-16 border-t border-gray-200 pt-8 text-center">
          <div className="rounded-lg bg-yellow-50 p-6">
            <h4 className="mb-2 font-semibold text-gray-900">⚠️ Disclaimer</h4>
            <p className="text-sm text-gray-600">
              We may earn a commission when you enroll in courses through our
              affiliate links, at no additional cost to you. All recommendations
              are based on research and genuine value to our readers.
            </p>
          </div>
        </div>
      </article>
    </BlogLayout>
  );
}

export const getStaticPaths = async () => {
  const database = await getNotionData(databaseId);
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.properties.Slug.rich_text[0].plain_text,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const database = await getNotionData(databaseId);
  const matched = database.find(
    (page) => page.properties.Slug.rich_text[0].plain_text === slug,
  );

  if (!matched) {
    return { notFound: true };
  }

  const page = await getPage(matched.id);
  const blocks = await getBlocks(matched.id);

  // NEW: fetch related post details
  const relatedRelations = page.properties?.["RelatedPosts"]?.relation || [];
  let relatedPosts = [];

  if (relatedRelations.length > 0) {
    const fetched = await Promise.all(
      relatedRelations.map(async (rel) => {
        const relPage = await getPage(rel.id);
        return {
          id: relPage.id,
          title: relPage.properties.Post?.title?.[0]?.plain_text || "Untitled",
          slug: relPage.properties.Slug?.rich_text?.[0]?.plain_text || "",
        };
      }),
    );
    relatedPosts = fetched;
  }

  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => ({
        id: block.id,
        children: await getBlocks(block.id),
      })),
  );

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children) {
      block[block.type].children =
        childrenBlocks.find((x) => x.id === block.id)?.children || [];
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
      relatedPosts,
    },
    revalidate: 60, // Add ISR for better performance
  };
};
