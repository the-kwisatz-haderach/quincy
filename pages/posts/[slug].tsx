import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { StoryblokResult } from 'storyblok-js-client'
import { Layout } from '../../components/Layout'
import Storyblok from '../../lib/storyblok'
import { Post, Story, StoryBlokLink } from '../../lib/types'

interface Props {
  story: Story<Post>
}

export default function PostComponent({ story }: Props): ReactElement {
  return (
    <Layout
      metaData={{
        title: story.name,
        description: '',
      }}
    >
      {story.content.title}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: StoryblokResult = await Storyblok.get('cdn/links/', {
    version: 'draft',
  })

  const paths = Object.values<StoryBlokLink>(res.data.links).flatMap((link) => {
    if (link.is_folder) return []
    if (link.slug === 'home' || link.real_path === '/') return []
    return { params: { slug: link.slug.split('/').slice(-1)[0] } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const { data } = await Storyblok.get(`cdn/stories/posts/${params?.slug}`, {
    version: 'draft',
  })
  return {
    props: {
      story: data.story,
    },
  }
}
