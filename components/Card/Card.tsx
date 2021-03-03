import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
  return (
    <div className="w-full shadow-lg p-5">
      <Image src={imageUrl} width={400} height={240} />
      <div>
        <h5 className="font-semibold my-2 text-xl">{title}</h5>
        <p className="leading-normal mb-3 overflow-hidden overflow-ellipsis max-h-18">
          {description.substr(0, 150)}...
        </p>
      </div>
      <Link href={url}>
        <a className="float-right transition-colors font-medium text-green-500 hover:text-green-300">
          Läs mer <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </Link>
    </div>
  )
}
