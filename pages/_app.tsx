import { ComponentType } from 'react'
import { MenuItem, SocialChannelLink } from '../lib/types'
import '../styles/globals.css'
import '../styles/fonts.css'
import '../styles/tailwind.css'
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons'
import { IAppContext } from '../context/AppContext/types'
import AppContext from '../context/AppContext'
import Storyblok from '../lib/storyblok'
import { GlobalStory } from '../lib/storyTypes'

const menu: MenuItem[] = [
  { title: 'home', url: '/' },
  { title: 'posts', url: '/posts' },
  { title: 'about', url: '/about' },
  { title: 'contact', url: '/contact' },
]

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

MyApp.getInitialProps = async (): Promise<{ appContext: IAppContext }> => {
  const { data } = await Storyblok.getStory('global', {
    version: 'draft',
  })
  // const { data } = await Storyblok.getStory('links', {
  //   version: 'draft',
  // })

  const { content } = data.story as GlobalStory

  const socialChannelLinks: SocialChannelLink[] = socialChannels.map(
    (channel) => ({
      title: channel.title,
      url: content[channel.key] ?? '#',
      icon: channel.icon,
    })
  )
  console.log(content.logo)
  return {
    appContext: {
      menu,
      socialChannels: socialChannelLinks,
      logoUrl: content.logo,
    },
  }
}

export default MyApp
