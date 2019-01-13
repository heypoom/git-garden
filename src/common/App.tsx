import React from 'react'
import {Root, Routes} from 'react-static'
import {Router} from '@reach/router'

import GardenPage from '../garden-page'
import LandingPage from '../landing'
import ChallengePage from '../challenge'

import '../style.sass'

const StaticRoutes = (_: {default: boolean}) => <Routes />

function App() {
  return (
    <Root>
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
