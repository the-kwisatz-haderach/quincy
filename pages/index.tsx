import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { HomeStory, PostStory } from '../lib/types'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { ArrowLink } from '../components/ArrowLink'

type Props = {
  story: HomeStory
  posts: PostStory[]
}

export default function Home({ story, posts }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
      <div className="flex font-semibold flex-row py-5 justify-between items-center">
        <h3>Latest posts</h3>
        <ArrowLink className="uppercase" href="posts">
          View all
        </ArrowLink>
      </div>
      <Grid>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.content.title}
            description={post.content.intro}
            imageUrl={`http:${post.content.image}`}
            url={post.full_slug}
          />
        ))}
      </Grid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await Storyblok.get(
    `${process.env.STORYBLOK_ENDPOINT_ROOT}/stories/home`,
    {
      version: 'draft',
      cv: Date.now(),
    }
  )
  const postsRes = await Storyblok.get(
    `${process.env.STORYBLOK_ENDPOINT_ROOT}/stories`,
    {
      version: 'draft',
      sort_by: 'created_at:desc',
      starts_with: 'posts',
      per_page: 6,
      cv: Date.now(),
    }
  )
  const story: HomeStory = res.data.story
  const posts: PostStory[] = postsRes.data.stories

  return {
    props: {
      story,
      posts,
    },
  }
}
