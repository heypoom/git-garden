import React from 'react'
import {Head} from 'react-static'

export default function SiteHead() {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>Git Garden</title>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}
