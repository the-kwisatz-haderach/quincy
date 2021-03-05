import { MenuItem, SocialChannelLink } from '../../lib/types'

export type Locale = 'sv' | 'en'

export interface IAppContext {
  menu: Record<Locale, MenuItem[]>
  socialChannels: SocialChannelLink[]
  logoUrl: string
  locale: Locale
}
