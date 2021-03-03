import React, { ReactElement, PropsWithChildren, ComponentProps } from 'react'
import { Richtext } from 'storyblok-js-client'
import Storyblok from '../../lib/storyblok'

export type Props = PropsWithChildren<{ children: Richtext }> &
  ComponentProps<'div'>

const RichText: React.FC<Props> = ({ children, ...props }): ReactElement => {
  const richText = Storyblok.richTextResolver.render(children)
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: richText,
      }}
    />
  )
}

export default RichText
