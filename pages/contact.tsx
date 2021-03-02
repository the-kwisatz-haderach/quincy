import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { ContactStory } from '../lib/types'

type Props = {
  story: ContactStory
}

export default function Contact({ story }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await Storyblok.get(
    `${process.env.STORYBLOK_ENDPOINT_ROOT}/stories/contact`,
    {
      version: 'draft',
      cv: Date.now(),
    }
  )
  const story: ContactStory = res.data.story

  return {
    props: {
      story,
    },
  }
}
