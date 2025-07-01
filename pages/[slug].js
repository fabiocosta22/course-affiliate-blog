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
  const image = pageData.properties['Cover Image'].files[0]
  const imageUrl = image?.type === 'file' ? image.file.url : image?.external.url
  const ctaLink = pageData.properties?.URL?.url || '#'

  return (
    <Container title={title} description={description} image={imageUrl}>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {imageUrl && (
          <div className="mb-6">
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        )}

        <p className="text-gray-600 mb-6">{description}</p>

        {ctaLink !== '#' && (
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            👉 Enroll in this Course
          </a>
        )}

        <div className="prose prose-lg max-w-none">
          <NotionRenderer
            recordMap={recordMap}
            components={{ Code }}
            darkMode={false}
          />
        </div>

        {ctaLink !== '#' && (
          <div className="mt-10 text-center">
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
      </article>
    </Container>
  )
}
