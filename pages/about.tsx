import { GetStaticProps } from 'next'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { PageStory } from '../lib/storyTypes'

type Props = {
  story: PageStory
}

export default function About({ story }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const loc = locale === 'en' ? '' : `${locale}/`
  const res = await Storyblok.getStory(`${loc}/about`, {
    version: 'draft',
    cv: Date.now(),
  })
  const story: PageStory = res.data.story

  return {
    props: {
      story,
    },
  }
}
