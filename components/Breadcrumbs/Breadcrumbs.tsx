import React, { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs(): ReactElement | null {
  const router = useRouter()
  const isHomePage = router.asPath === '/'

  if (isHomePage) {
    return null
  }

  const crumbs = router.asPath.split('/').slice(1)

  return (
    <div className="w-full py-5 bg-green-600 text-white">
      <div className="mx-auto px-5 space-x-2 max-w-screen-xl flex">
        <Link href="/">
          <a className="hover:text-green-300 transition-colors">Home</a>
        </Link>
        {crumbs.map((slug) => (
          <div key={slug} className={`flex space-x-2 ${styles.crumbs}`}>
            <p className="pointer-events-none">/</p>
            <Link href={'/' + slug}>
              <a className="hover:text-green-300 transition-colors">
                {(slug[0].toUpperCase() + slug.slice(1)).replace('-', ' ')}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
