import { Head } from '../Head'
import { Navigation } from '../Navigation'
import { Footer } from '../Footer'
import { Breadcrumbs } from '../Breadcrumbs'
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons'

const menu = [
  { title: 'home', link: '/' },
  { title: 'posts', link: '/posts' },
  { title: 'about', link: '/about' },
  { title: 'contact', link: '/contact' },
]

const socialChannels = [
  {
    title: 'Facebook',
    link: '#',
    icon: faFacebookSquare,
  },
  {
    title: 'Twitter',
    link: '#',
    icon: faTwitterSquare,
  },
  {
    title: 'Instagram',
    link: '#',
    icon: faInstagramSquare,
  },
]

export type Props = {
  metaData: {
    title: string
    description: string
  }
}

const Layout: React.FC<Props> = ({ children, metaData }) => (
  <div className="min-h-screen flex flex-col">
    <Head title={metaData.title} description={metaData.description} />
    <Navigation menu={menu} />
    <Breadcrumbs />
    <div>{children}</div>
    <Footer socialChannels={socialChannels} />
  </div>
)

export default Layout
