import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { Card } from '../../components/Card'
import { Grid } from '../../components/Grid'
import { Layout } from '../../components/Layout'
import Storyblok from '../../lib/storyblok'
import { Post, Story } from '../../lib/types'

interface Props {
  posts: Story<Post>[]
}

export default function PostsIndex({ posts }: Props): ReactElement {
  return (
    <Layout
      metaData={{
        title: 'Posts',
        description: '',
      }}
    >
      <Grid>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.content.title}
            description={post.content.intro}
            url={post.full_slug}
            imageUrl={`http:${post.content.image}`}
          />
        ))}
      </Grid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await Storyblok.getStories({
    sort_by: 'created_at:desc',
    starts_with: 'posts',
    version: 'draft',
  })

  return {
    props: {
      posts: data.stories as Story<Post>[],
    },
  }
}
