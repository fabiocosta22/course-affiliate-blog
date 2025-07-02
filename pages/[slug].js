// pages/[slug].js
import BlogLayout from '../layouts/BlogLayout'
import { getNotionData, getPage, getBlocks } from '../lib/getNotionData'
import { RenderBlocks } from '../components/ContentBlocks'

const databaseId = process.env.NOTION_DATABASE_ID

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div className="text-center mt-20">Loading...</div>
  }

  const title = page.properties.Post.title[0].plain_text

  return (
    <BlogLayout data={page} content={blocks}>
      <span className="text-sm text-gray-500">
        {new Date(page.created_time).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </span>

      <h1 className="mb-5 text-3xl font-bold tracking-tight text-black md:text-5xl">
        {title}
      </h1>

      <RenderBlocks blocks={blocks} />
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  const database = await getNotionData(databaseId)

  const paths = database.map((page) => ({
    params: {
      slug: page.properties.Slug.rich_text[0].plain_text,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const database = await getNotionData(databaseId)

  const match = database.find(
    (page) => page.properties.Slug.rich_text[0].plain_text === slug
  )

  if (!match) {
    return {
      notFound: true,
    }
  }

  const page = await getPage(match.id)
  const blocks = await getBlocks(match.id)

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
      block[block.type].children =
        childrenBlocks.find((x) => x.id === block.id)?.children || []
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
