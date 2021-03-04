import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Card.module.css'
import { ArrowLink } from '../ArrowLink'

export interface Props {
  title: string
  description: string
  url: string
  imageUrl: string
  tags: string[]
}

export default function Card({
  title,
  description,
  url,
  imageUrl,
  tags,
}: Props): ReactElement {
  const shortenedDescription = description.substr(0, 150)
  return (
    <div className={styles.card}>
      <Link href={url}>
        <div className={styles['image-container']}>
          <div className="absolute z-10 w-full h-full bg-gradient-to-bl from-transparent to-green-500" />
          <Image src={imageUrl} layout="fill" />
        </div>
      </Link>
      <div className="flex flex-col flex-grow items-end justify-between">
        <div className="w-full h-full">
          <h5 className="font-semibold my-2 text-xl">{title}</h5>
          <p className="leading-normal mb-3 overflow-hidden overflow-ellipsis max-h-18">
            {shortenedDescription}
            {shortenedDescription.length >= 150 ? '...' : ''}
          </p>
        </div>
        <div className="relative flex flex-row justify-between items-center w-full overflow-hidden">
          <div className="absolute left-0 top-0 overflow-hidden space-x-1 flex flex-row text-gray-300 text-regular">
            {tags.map((tag) => (
              <p key={tag}>#{tag}</p>
            ))}
          </div>
          <div className={`w-full h-full relative`}>
            <ArrowLink
              href={url}
              className={`float-right pl-10 text-green-500 ${styles['gradient-fade-out']}`}
            >
              Läs mer
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
