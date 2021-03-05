import Image from 'next/image'
import React, { ReactElement } from 'react'
import type { HeroImage as HeroImageType } from '../../lib/types'
import styles from './HeroImage.module.css'

export default function HeroImage({
  title,
  subtitle,
  description,
  image,
}: HeroImageType): ReactElement {
  return (
    <div
      className={styles['hero-image']}
      style={{
        height: 500,
        background: `linear-gradient(45deg, #065f46, #6edcbd, transparent), url(http:${image})`,
      }}
    >
      <div className="absolute p-10 top-0 left-0 flex flex-col items-start justify-end h-full w-full">
        <h1 className="contained relative right-2 my-5">{title}</h1>
        <p className="contained text-2xl intro my-0">{subtitle}</p>
        <p className="contained text-lg my-3">{description}</p>
      </div>
    </div>
  )
}
