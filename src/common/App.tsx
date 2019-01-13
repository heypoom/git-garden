import React from 'react'
import {Root, Routes} from 'react-static'
import {Router} from '@reach/router'

import 'normalize.css'

import SiteHead from './SiteHead'

import NotFound from '../not-found'
import GardenPage from '../garden-page'
import ChallengePage from '../challenge'

import '../style.sass'

const StaticRoutes = (_: {default: boolean}) => <Routes />

function App() {
  return (
    <Root>
      <SiteHead />

      <Router>
        <NotFound path="/not-found" />
        <ChallengePage path="/challenge" />
        <ChallengePage path="/challenge/:user" />
        <GardenPage path="/:user" />
        <StaticRoutes default />
      </Router>
    </Root>
  )
}

export default App
