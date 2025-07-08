import { useRouter } from 'next/router'
import Head from 'next/head'
import Nav from './Nav'
import Footer from './Footer'

const baseUrl = 'https://www.coursefinderhub.com' // or your own domain

export default function Container(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: 'CourseFinderHub – Curated Course Reviews',
    description: `Honest, AI-powered reviews of top online courses to help you learn faster and better.`,
    type: 'website',
    image: '/site.png',
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={meta.description} />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <link rel="canonical" href={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="CourseFinderHub" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main id="skip" className="px-4">
        {children}
        <Footer />
      </main>
    </>
  )
}
