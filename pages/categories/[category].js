import Container from '../../components/Container'
import Link from 'next/link'
import { getAllPosts } from '../../lib/notion'

export async function getStaticPaths() {
  const posts = await getAllPosts()

  // Collect all unique categories
  const categoriesSet = new Set()
  posts.forEach(post => {
    post.categories?.forEach(cat => categoriesSet.add(cat))
  })

  const paths = [...categoriesSet].map(category => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllPosts()
  const category = params.category

  const posts = allPosts.filter(post =>
    post.categories?.includes(category)
  )

  return {
    props: {
      category,
      posts,
    },
    revalidate: 60,
  }
}

export default function CategoryPage({ category, posts }) {
  return (
    <Container
      title={`Courses tagged with "${category}" – CourseFinderHub`}
      description={`Browse top-rated online courses in ${category}`}
    >
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Courses in <span className="text-blue-600">{category}</span></h1>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found in this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => {
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
        )}
      </section>
    </Container>
  )
}
