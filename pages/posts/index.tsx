import React, { ReactElement } from 'react'
import { Layout } from '../../components/Layout'

interface Props {}

export default function index({}: Props): ReactElement {
  return (
    <Layout
      metaData={{
        title: 'Posts',
        description: '',
      }}
    >
      hello
    </Layout>
  )
}
