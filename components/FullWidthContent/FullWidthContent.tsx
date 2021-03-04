import React, { ReactElement } from 'react'
import { FullWidthContentBlok } from '../../lib/blokTypes'
import { RichText } from '../RichText'

export default function FullWidthContent({
  body,
}: FullWidthContentBlok): ReactElement {
  return <RichText className="w-full mx-auto px-5">{body}</RichText>
}
