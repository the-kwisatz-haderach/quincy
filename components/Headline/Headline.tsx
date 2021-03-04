import React, { ReactElement } from 'react'
import { HeadlineBlok } from '../../lib/blokTypes'
import { Color } from '../../lib/types'

const colorMap: Record<Color, string> = {
  'primary-dark': 'bg-green-800 text-white',
  'primary-light': 'bg-green-300',
  'secondary-dark': 'bg-red-800 text-white',
  'secondary-light': 'bg-red-300',
}

export default function Headline({
  title,
  description,
  color,
}: HeadlineBlok): ReactElement {
  return (
    <div
      className={`w-full flex flex-col p-10 justify-center items-center ${colorMap[color]}`}
    >
      <h1 className="mt-0">{title}</h1>
      <p>{description}</p>
    </div>
  )
}
