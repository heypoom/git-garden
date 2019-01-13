import React from 'react'
import {Root, Routes} from 'react-static'
import {Router, Link} from '@reach/router'

import Garden from '../garden-page'
import Landing from '../landing'
import Challenge from '../challenge'

import '../style.sass'

const StaticRoutes = (_: {default: boolean}) => <Routes />

function App() {
  return (
    <Root>
      <Router>
        <Landing path="/" />
        <Challenge path="/challenge" />
        <Garden path="/:id" />
        <StaticRoutes default />
      </Router>
    </Root>
  )
}

export default App
