import React from 'react'
import NextHead from 'next/head'

export type Props = {
  title: string
  description: string
}

const Head: React.FC<Props> = ({ title, description }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || ''}</title>
    <meta name="description" content={description || ''} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </NextHead>
)

export default Head
