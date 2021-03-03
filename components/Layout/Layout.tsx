import { Head } from '../Head'
import { Navigation } from '../Navigation'
import { Footer } from '../Footer'
import { Breadcrumbs } from '../Breadcrumbs'

const menu = [
  { title: 'home', link: '/' },
  { title: 'about', link: '/about' },
  { title: 'contact', link: '/contact' },
  { title: 'posts', link: '/posts' },
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
    <Breadcrumbs
      path={[
        { url: '/', title: 'home' },
        { url: '/about', title: 'about' },
      ]}
    />
    <div className="container mx-auto">{children}</div>
    <Footer />
  </div>
)

export default Layout
