import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'
import slugify from 'slugify'

// ENV variables
const notion = new Client({ auth: process.env.NOTION_TOKEN })
const notionApi = new NotionAPI()
const databaseId = process.env.NOTION_DATABASE_ID

/**
 * Fetch all published posts from the Notion database
 */
// lib/notion.js

export async function getAllPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })

  return response.results.map((page) => {
    const title = page.properties['Post']?.title?.[0]?.plain_text || 'Untitled'
    const slug = page.properties['Slug']?.rich_text?.[0]?.plain_text || slugify(title, { lower: true })
    const description = page.properties['Description']?.rich_text?.[0]?.plain_text || ''
    const date = page.properties['Date']?.date?.start || null

    return {
      id: page.id,
      title,
      slug,
      description,
      date,
    }
  })
}


/**
 * Fetch full post data + Notion recordMap based on slug
 */
export async function getPostBySlug(slug) {
  const posts = await getAllPosts()
  const matched = posts.find((post) => post.slug === slug)

  if (!matched) return { recordMap: null, pageData: null }

  const recordMap = await notionApi.getPage(matched.id)
  const pageBlock = recordMap.block[matched.id]?.value

  return {
    recordMap,
    pageData: {
      id: matched.id,
      slug: matched.slug,
      properties: pageBlock?.properties || {},
    },
  }
}
