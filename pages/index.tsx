import { GetStaticProps } from 'next'
import Layout from '../components/Layout'
import { Page } from '../components/Page'
import { PageStory } from '../lib/types'
import storyblokInstance from '../utils/storyblok-service'

type Props = {
  story: PageStory
}

export default function Home({ story }: Props): React.ReactElement {
  return (
    <Layout>
      <Page story={story} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await storyblokInstance.get(
    `${process.env.STORYBLOK_ENDPOINT_ROOT}/stories/home`
  )
  const story: PageStory = res.data.story

  return {
    props: {
      story,
    },
  }
}
