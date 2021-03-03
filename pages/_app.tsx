import { ComponentType } from 'react'
import '../styles/globals.css'
import '../styles/fonts.css'
import '../styles/tailwind.css'

type Props = {
  Component: ComponentType
  pageProps: any
}

function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}

export default MyApp
