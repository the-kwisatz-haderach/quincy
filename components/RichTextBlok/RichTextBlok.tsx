import React, { ReactElement } from 'react'
import type { RichTextBlok as RichTextBlokType } from '../../lib/types'
import { RichText } from '../RichText'

export default function RichTextBlok({ text }: RichTextBlokType): ReactElement {
  return <RichText>{text}</RichText>
}
