import Link from "next/link";
import Container from "../components/Container";
import { getAllPosts } from "../lib/notion";

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default function Home({ posts }) {
  return (
    <Container
      title="CourseFinderHub – Discover the Best Online Courses"
      description="Curated lists of top-rated online courses from platforms like Udemy, Coursera, and more."
    >
      <section className="py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Find the Best Online Courses
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-lg text-gray-600">
          Curated & reviewed lists to help you choose the right course faster.
        </p>
        <Link href="#latest">
          <a className="inline-block rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
            Explore Top Picks
          </a>
        </Link>
      </section>

      <section id="latest" className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="mb-8 text-center text-2xl font-semibold">
          Latest Reviews
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const image = post.coverImage;
            const imageUrl =
              image?.type === "file" ? image.file.url : image?.external?.url;

            return (
              <Link key={post.slug} href={`/${post.slug}`}>
                <a className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold transition group-hover:text-blue-600">
                      {post.title}
                    </h3>

                    {/* Category Tags */}
                    {post.categories?.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <Link
                            key={category}
                            href={`/categories/${encodeURIComponent(category)}`}
                          >
                            <a className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 transition hover:bg-blue-200">
                              {category}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}

                    <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                      {post.description || "No description available"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="font-medium text-blue-500">
                        Read more →
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
