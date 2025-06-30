// lib/notion.js
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID

export async function getAllPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return response.results.map((page) => {
    return {
      id: page.id,
      slug: page.properties.Slug.rich_text[0]?.plain_text,
      title: page.properties.Post.title[0]?.plain_text,
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      date: page.properties.Date.date.start,
    }
  })
}
