import { MenuItem, SocialChannelLink } from '../../lib/types'

export interface IAppContext {
  menu: MenuItem[]
  socialChannels: SocialChannelLink[]
  logoUrl: string
}
