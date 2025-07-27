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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find the Best Online Courses</span>
              <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Boost Your Career
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600">
              Curated & expert-reviewed lists to help you choose the right
              course faster and advance your career.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#latest">
                <a className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl">
                  Explore Top Picks
                </a>
              </Link>
              <Link href="#how-it-works">
                <a className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                  How It Works
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600">50+</div>
              <div className="mt-2 text-lg font-medium text-gray-500">
                Courses Reviewed
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600">10K+</div>
              <div className="mt-2 text-lg font-medium text-gray-500">
                Students Helped
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600">95%</div>
              <div className="mt-2 text-lg font-medium text-gray-500">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section id="latest" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Latest Course Reviews
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              Expert insights to help you make informed learning decisions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const image = post.coverImage;
              const imageUrl =
                image?.type === "file" ? image.file.url : image?.external?.url;

              return (
                <Link key={post.slug} href={`/${post.slug}`}>
                  <a className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-xl">
                    {imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="mb-3 text-xl font-bold text-gray-900 transition group-hover:text-blue-600">
                        {post.title}
                      </h3>

                      {/* Category Tags */}
                      {post.categories?.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.categories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="mb-4 line-clamp-3 text-gray-600">
                        {post.description || "No description available"}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center font-semibold text-blue-600">
                          Read review
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
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Advance Your Career?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            Join thousands of learners who found their perfect course with our
            expert recommendations.
          </p>
          <div className="mt-10">
            <Link href="#latest">
              <a className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                Browse All Courses
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
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
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
