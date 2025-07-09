import Container from '../components/Container'

export default function BlogLayout({ children, data }) {
  const title = data.properties?.Post?.title?.[0]?.plain_text || 'Untitled'
  const description = data.properties?.Description?.rich_text?.[0]?.plain_text || ''
  const date = data.properties?.Date?.date?.start
    ? new Date(data.properties.Date.date.start)
    : null

  const postImage = data.properties?.CoverImage?.files?.[0]
  const postImageUrl =
    postImage?.type === 'file' ? postImage.file.url : postImage?.external?.url

  return (
    <Container
      title={title}
      description={description}
      date={date}
      type="article"
      image={postImageUrl}
    >
      <article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
        {children}
      </article>
    </Container>
  )
}
