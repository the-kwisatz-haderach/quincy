import { ComponentType } from 'react'
import { SocialChannelLink, StoryBlokLink } from '../lib/types'
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'
import { IAppContext, Locale } from '../context/AppContext/types'
import AppContext from '../context/AppContext'
import Storyblok from '../lib/storyblok'
import { GlobalStory } from '../lib/storyTypes'
import '../styles/globals.css'
import '../styles/fonts.css'
import '../styles/tailwind.css'

const menu: IAppContext['menu'] = {
  en: [
    { title: 'home', url: '/' },
    { title: 'posts', url: '/posts' },
    { title: 'about', url: '/about' },
    { title: 'contact', url: '/contact' },
  ],
  sv: [
    { title: 'hem', url: '/' },
    { title: 'inlägg', url: '/posts' },
    { title: 'om oss', url: '/about' },
    { title: 'kontakt', url: '/contact' },
  ],
}

const socialChannels = [
  {
    key: 'facebook',
    title: 'Facebook',
    icon: faFacebookSquare,
  },
  {
    key: 'twitter',
    title: 'Twitter',
    icon: faTwitterSquare,
  },
  {
    key: 'instagram',
    title: 'Instagram',
    icon: faInstagramSquare,
  },
] as const

type Props = {
  Component: ComponentType
  pageProps: Record<string, unknown>
  appContext: IAppContext
}

function MyApp({ Component, pageProps, appContext }: Props) {
  return (
    <AppContext value={appContext}>
      <Component {...pageProps} />
    </AppContext>
  )
}

const makeAppLinks = (defaultLocale: Locale) => (
  links: StoryBlokLink[]
): IAppContext['menu'] => {
  return links.reduce<IAppContext['menu']>(
    (acc, curr) => {
      curr.alternates.forEach((alternate) => {
        acc[alternate.lang as Locale].push({
          title: alternate.name ?? curr.name,
          url: curr.real_path,
        })
      })
      acc[defaultLocale].push({
        title: curr.name,
        url: curr.real_path,
      })
      return acc
    },
    { sv: [], en: [] }
  )
}

MyApp.getInitialProps = async (
  context: Record<string, any>
): Promise<{ appContext: IAppContext }> => {
  const { data } = await Storyblok.getStory('global', {
    version: 'draft',
  })
  const response = await Storyblok.get('cdn/links', {
    version: 'draft',
  })

  const { links } = response.data

  const myLinks = ((Object.values(links) as unknown) as StoryBlokLink[])
    .flatMap((link) => {
      if (link.slug !== 'global' && link.parent_id === 0) {
        return link
      }
      return []
    })
    .sort((a, b) => b.position - a.position)

  const { content } = data.story as GlobalStory

  const socialChannelLinks: SocialChannelLink[] = socialChannels.flatMap(
    (channel) => {
      const channelContent = content[channel.key]
      if (!channelContent) return []
      return {
        title: channel.title,
        url: content[channel.key],
        icon: channel.icon,
      }
    }
  )
  return {
    appContext: {
      menu: makeAppLinks('en')(myLinks),
      socialChannels: socialChannelLinks,
      logoUrl: content.logo,
      locale: context.router.locale,
    },
  }
}

export default MyApp
