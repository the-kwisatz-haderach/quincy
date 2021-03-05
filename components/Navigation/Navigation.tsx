import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItem } from '../../lib/types'
import styles from './Navigation.module.css'

export type Props = {
  menu: MenuItem[]
  logoUrl: string
}

const linkStyles = 'hover:text-green-500 transition-colors'

const Navigation: React.FC<Props> = ({ menu = [], logoUrl }) => {
  const [home, ...menuLinks] = menu
  const router = useRouter()

  const isSelected = (path: string) =>
    path === router.asPath ||
    router.asPath.split('/')[1] === path.replace('/', '')

  return (
    <header className="sticky top-0 z-50 h-16 bg-white px-10 flex flex-row justify-between items-center shadow-md">
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
      <nav className="flex flex-row space-x-10 capitalize">
        {menuLinks.map((item) => (
          <Link href={item.url} key={item.title}>
            <a
              className={
                isSelected(item.url)
                  ? `${styles.selected} text-green-500 ${linkStyles}`
                  : linkStyles
              }
            >
              {item.title}
            </a>
          </Link>
        ))}
        <div className="flex flex-row space-x-1">
          <Link href={router.asPath} locale="sv">
            <a>SV</a>
          </Link>
          <span>/</span>
          <Link href={router.asPath} locale="en">
            <a>EN</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
