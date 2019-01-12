import React from 'react'
import {Root, Routes} from 'react-static'
import {Router, Link} from '@reach/router'

import Garden from '../garden'
import Landing from '../landing'
import Challenge from '../challenge'

function StaticRoutes({default: bool = false}) {
  return <Routes />
}

function App() {
  return (
    <Root>
      <Router>
        <Landing path="/" />
        <Challenge path="/challenge" />
        <Garden path="/*" />
        <StaticRoutes default />
      </Router>
    </Root>
  )
}

export default App
