import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

interface Props {}

export default function PageNotFound({}: Props): ReactElement {
  const router = useRouter()

  return (
    <Layout
      metaData={{
        title: '404 - Page Not Found',
        description: '',
      }}
    >
      <div className="contained flex flex-col items-center justify-center">
        <h1 className="text-8xl my-5">404</h1>
        <p className="text-xl">Are you lost?</p>
        <button
          onClick={() => router.back()}
          className="mt-10 text-white transition-colors bg-green-600 hover:bg-green-300 rounded p-3"
        >
          Go back
        </button>
      </div>
    </Layout>
  )
}
