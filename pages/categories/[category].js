// pages/categories/[category].js
import { getAllPosts } from '../../lib/notion'
import Container from '../../components/Container'
import Link from 'next/link'

export async function getStaticPaths() {
  const posts = await getAllPosts()
  const allCategories = [...new Set(posts.flatMap(post => post.categories))]

  return {
    paths: allCategories.map((cat) => ({
      params: { category: cat.toLowerCase() }
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const posts = await getAllPosts()
  const category = params.category.toLowerCase()

  const filtered = posts.filter(post =>
    post.categories.some(cat => cat.toLowerCase() === category)
  )

  return {
    props: {
      posts: filtered,
      category,
    },
  }
}

export default function CategoryPage({ posts, category }) {
  return (
    <Container
      title={`Category: ${category}`}
      description={`All posts tagged with ${category}`}
    >
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 capitalize">Category: {category}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <a className="border rounded-xl p-4 hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{post.description}</p>
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
