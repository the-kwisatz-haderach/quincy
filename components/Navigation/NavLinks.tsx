import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Navigation.module.css'
import { MenuItem } from '../../lib/types'
import { Locale } from '../../context/AppContext/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface Props {
  links: MenuItem[]
  locale: Locale
}

const linkStyles =
  'hover:text-green-500 transition-colors inline-block text-center p-2'

export default function NavLinks({ links, locale }: Props): ReactElement {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const isSelected = (path: string) =>
    path === router.asPath ||
    router.asPath.split('/')[1] === path.replace('/', '')

  const menuClass = isOpen ? '' : styles.show

  return (
    <div>
      <nav className="sm:hidden w-full relative flex flex-row capitalize">
        <button
          onClick={() => {
            setIsOpen((curr) => !curr)
          }}
        >
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        </button>
        <div className={`${styles['link-container']} ${menuClass}`}>
          {links.map((item) => (
            <Link href={item.url} key={item.title}>
              <a
                className={
                  isSelected(item.url)
                    ? `${styles.selected} w-full text-green-500 ${linkStyles}`
                    : `${linkStyles} w-full`
                }
              >
                {item.title}
              </a>
            </Link>
          ))}
          <div
            className={`${menuClass} w-full py-3 justify-center flex flex-row space-x-1`}
          >
            <Link href={router.asPath} locale="sv">
              <a className={locale === 'sv' ? styles.selected : ''}>SV</a>
            </Link>
            <span>/</span>
            <Link href={router.asPath} locale="en">
              <a className={locale === 'en' ? styles.selected : ''}>EN</a>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="hidden sm:flex items-center space-x-5 md:space-x-10 p-5 flex-row capitalize">
        {links.map((item) => (
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
            <a className={locale === 'sv' ? styles.selected : ''}>SV</a>
          </Link>
          <span>/</span>
          <Link href={router.asPath} locale="en">
            <a className={locale === 'en' ? styles.selected : ''}>EN</a>
          </Link>
        </div>
      </nav>
    </div>
  )
}
