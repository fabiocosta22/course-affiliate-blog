import Link from 'next/link'
import Container from '../components/Container'
import { getAllPosts } from '../lib/notion'

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

export default function Home({ posts }) {
  return (
    <Container
      title="CourseFinderHub – Discover the Best Online Courses"
      description="Curated lists of top-rated online courses from platforms like Udemy, Coursera, and more."
    >
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find the Best Online Courses</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
          Curated & reviewed lists to help you choose the right course faster.
        </p>
        <Link href="#latest">
          <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Explore Top Picks
          </a>
        </Link>
      </section>

      <section id="latest" className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">Latest Reviews</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const image = post.coverImage
            const imageUrl = image?.type === 'file' ? image.file.url : image?.external?.url

            return (
              <Link key={post.slug} href={`/${post.slug}`}>
                <a className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition bg-white">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition">
                      {post.title}
                    </h3>

                    {/* Category Tags */}
                    {post.categories?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categories.map((category) => (
                          <Link key={category} href={`/categories/${encodeURIComponent(category)}`}>
                            <a className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition">
                              {category}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {post.description || 'No description available'}
                    </p>
                    <div className="text-xs text-gray-400 flex justify-between items-center">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="text-blue-500 font-medium">Read more →</span>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
      </section>
    </Container>
  )
}
