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

  return (
    <BlogLayout data={page} content={blocks}>
      <article className="mx-auto max-w-4xl px-4 py-16">
        {/* Hero Image */}
        {imageUrl && (
          <div className="relative mb-12 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={imageUrl}
              alt={title}
              className="h-80 w-full object-cover sm:h-96"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <h1 className="absolute bottom-6 left-6 text-4xl font-extrabold text-white drop-shadow-lg">
              {title}
            </h1>
          </div>
        )}

        {/* Description */}
        <p className="mb-6 text-lg text-gray-600">{description}</p>

        {/* CTA */}
        {ctaLink !== "#" && (
          <div className="mb-12 text-center">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 text-lg font-medium text-white shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              👉 Enroll in this Course
            </a>
          </div>
        )}

        {/* Notion Content */}
        <RenderBlocks blocks={blocks} />

        {/* Second CTA */}
        {ctaLink !== "#" && (
          <div className="mt-16 text-center">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
            >
              🚀 Start Learning Now
            </a>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts?.length > 0 && (
          <div className="mt-20 border-t pt-10">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Related Posts
            </h3>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedPosts.map((post) => (
                <li key={post.id}>
                  <Link href={`/${post.slug}`}>
                    <a className="block rounded-xl border p-4 shadow-sm transition hover:border-blue-500 hover:shadow-md">
                      <h4 className="text-lg font-medium text-blue-600">
                        {post.title}
                      </h4>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
      relatedPosts, // pass as prop
    },
  };
};
