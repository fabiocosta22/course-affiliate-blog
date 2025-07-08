// pages/[slug].js
import BlogLayout from '../layouts/BlogLayout'
import { getNotionData, getPage, getBlocks } from '../lib/getNotionData'
import { RenderBlocks } from '../components/ContentBlocks'

const databaseId = process.env.NOTION_DATABASE_ID

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <p className="text-center mt-20">Loading...</p>
  }

  const title = page.properties.Post.title[0].plain_text
  const description = page.properties.Description?.rich_text[0]?.plain_text || ''
  const image = page.properties['Cover Image']?.files?.[0]
  const imageUrl = image?.type === 'file' ? image.file.url : image?.external?.url
  const ctaLink = page.properties?.URL?.url || '#'

  return (
    <BlogLayout data={page} content={blocks}>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {imageUrl && (
          <div className="mb-6">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl object-cover w-full h-auto"
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

        <RenderBlocks blocks={blocks} />

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
    </BlogLayout>
  )
}

export const getStaticPaths = async () => {
  const database = await getNotionData(databaseId)
  return {
    paths: database.map((page) => ({
      params: {
        slug: page.properties.Slug.rich_text[0].plain_text,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const database = await getNotionData(databaseId)
  const matched = database.find((page) => page.properties.Slug.rich_text[0].plain_text === slug)

  if (!matched) {
    return { notFound: true }
  }

  const page = await getPage(matched.id)
  const blocks = await getBlocks(matched.id)

  const childrenBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => ({
        id: block.id,
        children: await getBlocks(block.id),
      }))
  )

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children) {
      block[block.type].children = childrenBlocks.find((x) => x.id === block.id)?.children || []
    }
    return block
  })

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
  }
}
