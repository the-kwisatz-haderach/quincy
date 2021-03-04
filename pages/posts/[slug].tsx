import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { StoryblokResult } from 'storyblok-js-client'
import { Layout } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import Storyblok from '../../lib/storyblok'
import { PostStory } from '../../lib/storyTypes'
import { StoryBlokLink } from '../../lib/types'

interface Props {
  story: PostStory
}

export default function PostComponent({ story }: Props): ReactElement {
  return (
    <Layout
      metaData={{
        title: story.name,
        description: '',
      }}
    >
      <div className="contained">
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
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data }: StoryblokResult = await Storyblok.get('cdn/links/', {
    version: 'draft',
  })

  const paths = Object.values<StoryBlokLink>(data.links).flatMap((link) => {
    if (link.is_folder) return []
    if (
      link.slug === 'home' ||
      link.slug === 'about' ||
      link.slug === 'contact' ||
      link.real_path === '/'
    )
      return []
    return link.alternates.map((altLink) => ({
      params: { slug: altLink.path.split('/').slice(-1)[0] },
      locale: altLink.lang,
    }))
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
  locale,
}) => {
  const { data } = await Storyblok.getStory(
    `${locale}/posts/${params?.slug}` || '',
    {
      version: 'draft',
      cv: Date.now(),
    }
  )

  return {
    props: {
      story: data.story as PostStory,
    },
  }
}
