import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { StoryblokResult } from 'storyblok-js-client'
import { Layout } from '../../components/Layout'
import { RichText } from '../../components/RichText'
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
      <div className="relative w-full h-80">
        <Image
          src={`http:${story.content.image}`}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <h1 className="my-8">{story.content.title}</h1>
      <p className="intro">{story.content.intro}</p>
      <RichText className="text-normal leading-7">
        {story.content.long_text}
      </RichText>
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
