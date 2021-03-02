import { Head } from '../Head'
import { Navigation } from '../Navigation'
import { Footer } from '../Footer'

const menu = [
  { title: 'home', link: '/' },
  { title: 'about', link: '/about' },
]

export type Props = {
  metaData: {
    title: string
    description: string
  }
}

const Layout: React.FC<Props> = ({ children, metaData }) => (
  <div className="bg-gray-300">
    <Head title={metaData.title} description={metaData.description} />
    <Navigation menu={menu} />
    {children}
    <Footer />
  </div>
)

export default Layout
