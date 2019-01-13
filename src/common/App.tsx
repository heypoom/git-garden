import React from 'react'
import {Root, Head, Routes} from 'react-static'
import {Router} from '@reach/router'

import GardenPage from '../garden-page'
import LandingPage from '../landing'
import ChallengePage from '../challenge'

import '../style.sass'

const StaticRoutes = (_: {default: boolean}) => <Routes />

function App() {
  return (
    <Root>
      <Head>
        <meta charSet="UTF-8" />
        <title>Git Garden</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Router>
        <LandingPage path="/" />
        <ChallengePage path="/challenge" />
        <GardenPage path="/:user" />
        <StaticRoutes default />
      </Router>
    </Root>
  )
}

export default App
