import { Head } from '../Head'
import { Navigation } from '../Navigation'
import { Footer } from '../Footer'
import { Breadcrumbs } from '../Breadcrumbs'
import { useAppContext } from '../../context/AppContext'

export type Props = {
  metaData: {
    title: string
    description: string
  }
}

const Layout: React.FC<Props> = ({ children, metaData }) => {
  const { menu, socialChannels, logoUrl, locale } = useAppContext()
  return (
    <div className="min-h-screen flex flex-col">
      <Head title={metaData.title} description={metaData.description} />
      <Navigation locale={locale} menu={menu[locale]} logoUrl={logoUrl} />
      <Breadcrumbs />
      <div>{children}</div>
      <Footer socialChannels={socialChannels} />
    </div>
  )
}

export default Layout
