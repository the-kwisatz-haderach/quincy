import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Navigation.module.css'

type MenuItem = {
  title: string
  link: string
}

export type Props = {
  menu: MenuItem[]
}

const linkStyles = 'hover:text-green-500 transition-colors'

const Navigation: React.FC<Props> = ({ menu = [] }) => {
  const [home, ...menuLinks] = menu
  const router = useRouter()

  const isSelected = (path: string) =>
    router.asPath.split('/')[1] === path.replace('/', '')

  return (
    <header className="sticky top-0 z-50 bg-white px-10 py-5 flex flex-row justify-between shadow-md">
      <div>
        <Link href={home.link}>LOGO</Link>
      </div>
      <nav className="flex flex-row space-x-10 capitalize">
        {menuLinks.map((item) => (
          <Link href={item.link} key={item.title}>
            <a
              className={
                isSelected(item.link)
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
