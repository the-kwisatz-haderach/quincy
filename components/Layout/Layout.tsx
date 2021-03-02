import { Head } from '../Head'
import { Navigation, Props as NavigationProps } from '../Navigation'
import Footer from '../../components/Footer'
import storyblokInstance from '../../utils/storyblok-service'

const menu = [{ title: 'home', link: '/home' }]

export type Props = {}

const Layout: React.FC<Props> = ({ children }) => (
  <div className="bg-gray-300">
    <Head title="Hello" description="World" />
    <Navigation menu={menu} />
    {children}
    <Footer />
    {storyblokInstance.bridge()}
  </div>
)

export default Layout
