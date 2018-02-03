import React, {Component} from 'react'
import {Router} from 'react-static'
import {injectGlobal} from 'emotion'

import Routes from 'react-static-routes'

class App extends Component {
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        font-family: Fira Mono, monospace;
      }
    `
  }

  render = () => (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
