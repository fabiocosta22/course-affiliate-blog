// pages/[slug].js
import Container from '../components/Container'
import { getAllPosts, getPostBySlug } from '../lib/notion'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Code = dynamic(() => import('react-notion-x/build/third-party/code'))

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { recordMap, pageData } = await getPostBySlug(params.slug)

  return {
    props: {
      recordMap,
      pageData,
    },
    revalidate: 60,
  }
}

export default function Post({ recordMap, pageData }) {
  if (!recordMap || !pageData) return <p className="text-center mt-20">Loading...</p>

  const title = pageData.properties.Post.title[0].plain_text
  const description = pageData.properties.Description.rich_text[0]?.plain_text || ''
  const image = pageData.properties['Cover Image']?.files?.[0]
  const imageUrl = image?.type === 'file' ? image.file.url : image?.external.url
  const ctaLink = pageData.properties?.URL?.url || '#'

  return (
    <Container title={title} description={description} image={imageUrl}>
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-600 text-sm">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className="mb-8">
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={400}
              className="rounded-xl object-cover w-full h-auto"
            />
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* CTA Button Top */}
        {ctaLink !== '#' && (
          <div className="text-center my-8">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700"
            >
              👉 Enroll in this Course
            </a>
          </div>
        )}

        {/* Notion Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <NotionRenderer
            recordMap={recordMap}
            components={{ Code }}
            darkMode={false}
          />
        </div>

        {/* CTA Bottom */}
        {ctaLink !== '#' && (
          <div className="mt-12 text-center">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700"
            >
              🚀 Start Learning Now
            </a>
          </div>
        )}

        {/* Share/Outro */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          Found this useful? Share it with a friend! 💡
        </footer>
      </article>
    </Container>
  )
}
