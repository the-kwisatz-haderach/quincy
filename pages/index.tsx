import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { Card } from '../components/Card'
import { Grid } from '../components/Grid'
import { ArrowLink } from '../components/ArrowLink'
import { PageStory, PostStory } from '../lib/storyTypes'

type Props = {
  story: PageStory
  posts: PostStory[]
}

export default function Home({ story, posts }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
      <div className="contained space-y-5">
        <div className="flex font-semibold flex-row justify-between items-center">
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
              tags={post.tag_list}
            />
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}home`, {
    version: 'draft',
    cv: Date.now(),
  })

  const postsRes = await Storyblok.getStories({
    version: 'draft',
    sort_by: 'created_at:desc',
    starts_with: 'posts',
    per_page: 6,
    cv: Date.now(),
  })

  return {
    props: {
      story: res.data.story as PageStory,
      posts: postsRes.data.stories as PostStory[],
    },
  }
}
