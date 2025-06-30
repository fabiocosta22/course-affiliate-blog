// pages/index.js
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

      <section id="latest" className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Latest Reviews</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <a className="border rounded-xl p-4 hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {post.description || 'No description available'}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  )
}
