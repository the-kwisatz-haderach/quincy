import StoryblokClient from 'storyblok-js-client'

class StoryblokService {
  private readonly devMode: boolean
  private readonly token: string
  private readonly client: StoryblokClient
  private query: Record<any, unknown>

  constructor() {
    this.devMode = true // Always loads draft
    this.token = process.env.STORYBLOK_TOKEN as string
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    })

    this.query = {}
  }

  getCacheVersion() {
    return this.client.cacheVersion
  }

  // ask Storyblok's Content API for content of story
  get(slug: string, params?: Record<string, unknown>) {
    params = params || {}

    if (
      this.getQuery('_storyblok') ||
      this.devMode ||
      (typeof window !== 'undefined' && window.storyblok)
    ) {
      params.version = 'draft'
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.StoryblokCacheVersion !== 'undefined'
    ) {
      params.cv = window.StoryblokCacheVersion
    }

    return this.client.get(slug, params)
  }

  // initialize the connection between Storyblok & Next.js in Visual Editor
  initEditor(reactComponent: any) {
    if (window.storyblok) {
      window.storyblok.init()

      // reload on Next.js page on save or publish event in Storyblok Visual Editor
      window.storyblok.on(['change', 'published'], () => location.reload(true))

      // Update state.story on input in Visual Editor
      // this will alter the state and replaces the current story with a current raw story object and resolve relations
      window.storyblok.on('input', (event) => {
        if (
          event &&
          event.story.content._uid === reactComponent.state.story.content._uid
        ) {
          event.story.content = window.storyblok.addComments(
            event.story.content,
            event.story.id
          )
          window.storyblok.resolveRelations(
            event.story,
            ['featured-articles.articles'],
            () => {
              reactComponent.setState({
                story: event.story,
              })
            }
          )
        }
      })
    }
  }

  setQuery(query: Record<string, unknown>) {
    this.query = query
  }

  getQuery(param: string) {
    return this.query[param]
  }

  bridge() {
    if (!this.getQuery('_storyblok') && !this.devMode) {
      return ''
    }
    return (
      <script
        src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}
      ></script>
    )
  }
}

const storyblokInstance = new StoryblokService()

export default storyblokInstance
