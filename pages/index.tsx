import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import useStoryblok from '../hooks/useStoryblok'
import Storyblok from '../lib/storyblok'
import { HomeStory, PostStory } from '../lib/types'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  story: HomeStory
  posts: PostStory[]
}

export default function Home({ story, posts }: Props): React.ReactElement {
  const storyContent = useStoryblok(story)
  return (
    <Layout metaData={{ title: story.name, description: '' }}>
      <Page story={storyContent} />
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 my-10">
        {posts.map((post) => (
          <div className="w-full shadow-lg p-5">
            <Image
              src={`http:${post.content.image}`}
              width={400}
              height={240}
            />
            <div>
              <h5 className="font-semibold my-2 text-xl">
                {post.content.title}
              </h5>
              <p className="leading-normal mb-3 overflow-hidden overflow-ellipsis max-h-18">
                {post.content.intro.substr(0, 150)}...
              </p>
            </div>
            <Link href={post.full_slug}>
              <a className="float-right transition-colors font-medium text-green-500 hover:text-green-300">
                Läs mer <FontAwesomeIcon icon={faCoffee} />
              </a>
            </Link>
          </div>
        ))}
      </div>
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
