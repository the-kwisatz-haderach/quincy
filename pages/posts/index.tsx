import { GetStaticProps } from 'next'
import React, { ReactElement, useCallback, useState } from 'react'
import { Card } from '../../components/Card'
import { Grid } from '../../components/Grid'
import { Layout } from '../../components/Layout'
import Storyblok from '../../lib/storyblok'
import { PostStory } from '../../lib/storyTypes'
import { useSet } from '../../hooks/useSet'
import { FilterMenu } from '../../components/FilterMenu'
import { SearchBar } from '../../components/SearchBar'

interface Props {
  posts: PostStory[]
}

const filterByTags = (tags: Set<string>) => (posts: PostStory[]) =>
  tags.size === 0
    ? posts
    : posts.filter(
        (post) => !post.tag_list.every((postTag) => tags.has(postTag))
      )

export default function PostsIndex({ posts }: Props): ReactElement {
  const [currentPosts, setCurrentPosts] = useState(posts)
  const { current: selectedTags, toggle: toggleTag } = useSet<string>([])

  const handleSearchQuery = useCallback(
    (query: string) => {
      const pattern = new RegExp(`.*${query}.*`, 'i')
      const filteredPosts = posts.filter((post) => {
        return (
          pattern.test(post.content.title) || pattern.test(post.content.intro)
        )
      })
      setCurrentPosts(filteredPosts)
    },
    [posts]
  )

  return (
    <Layout
      metaData={{
        title: 'Posts',
        description: '',
      }}
    >
      <div className="w-full p-5 bg-green-400 ">
        <div className="contained space-x-5 my-0 flex flex-row items-center">
          <div className="flex-grow">
            <p className="font-normal mb-2">Sök</p>
            <SearchBar onTypeQuery={handleSearchQuery} />
          </div>
          <FilterMenu
            title="Taggar"
            filters={posts
              .flatMap((post) => post.tag_list)
              .map((tag) => ({
                value: tag,
                label: `#${tag}`,
                isSelected: selectedTags.has(tag),
              }))}
            onSelectItem={toggleTag}
          />
        </div>
      </div>
      <div className="contained">
        <Grid>
          {filterByTags(selectedTags)(currentPosts).map((post) => (
            <Card
              key={post.id}
              title={post.content.title}
              description={post.content.intro}
              url={post.full_slug}
              imageUrl={`http:${post.content.image}`}
              tags={post.tag_list}
            />
          ))}
        </Grid>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { data } = await Storyblok.getStories({
    sort_by: 'created_at:desc',
    starts_with: `${context.locale}/posts`,
    version: 'draft',
  })

  return {
    props: {
      posts: data.stories as PostStory[],
    },
  }
}
