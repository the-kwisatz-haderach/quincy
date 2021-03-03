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
}

export default function Card({
  title,
  description,
  url,
  imageUrl,
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
        <div>
          <h5 className="font-semibold my-2 text-xl">{title}</h5>
          <p className="leading-normal mb-3 overflow-hidden overflow-ellipsis max-h-18">
            {shortenedDescription}
            {shortenedDescription.length >= 150 ? '...' : ''}
          </p>
        </div>
        <div>
          <ArrowLink href={url} className="place-self-end	text-green-500">
            Läs mer
          </ArrowLink>
        </div>
      </div>
    </div>
  )
}
