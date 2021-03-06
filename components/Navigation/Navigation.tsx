import Image from 'next/image'
import Link from 'next/link'
import { MenuItem } from '../../lib/types'
import { Locale } from '../../context/AppContext/types'
import NavLinks from './NavLinks'

export type Props = {
  menu: MenuItem[]
  logoUrl: string
  locale: Locale
}

const Navigation: React.FC<Props> = ({ menu = [], logoUrl, locale }) => {
  const [home, ...menuLinks] = menu
  return (
    <header className="border-b-2 border-solid border-grey overflow-hidden sticky top-0 z-50 h-16 bg-white px-10 flex flex-row justify-between items-center shadow-md">
      <div className="relative h-full mx-auto container max-w-screen-xl flex flex-row justify-between items-center">
        <Link href={home.url}>
          <div className="relative h-3/4 w-1/6 cursor-pointer">
            <Image
              src={`http:${logoUrl}`}
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
        </Link>
        <NavLinks links={menuLinks} locale={locale} />
      </div>
    </header>
  )
}

export default Navigation
