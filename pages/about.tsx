import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { AboutStory } from '../lib/types'

type Props = {
  story: AboutStory
}

export default function About({ story }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const res = await Storyblok.get(
    `${process.env.STORYBLOK_ENDPOINT_ROOT}/stories/about`,
    {
      version: 'draft',
      cv: Date.now(),
    }
  )
  const story: AboutStory = res.data.story

  return {
    props: {
      story,
    },
  }
}
