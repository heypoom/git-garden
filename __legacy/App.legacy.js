import React from 'react'
import {Provider} from 'react-redux'
import {lifecycle} from 'recompose'
import {injectGlobal} from 'emotion'

import Landing from '../../src-old/routes'
import Garden from '../routes/garden'
import NotFound from '../../src-old/routes/404'

import createStore from '../../src-old/ducks'

const store = createStore()

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/:id" component={Garden} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

const enhance = lifecycle({
  componentWillMount() {
    injectGlobal`
      body {
        margin: 0;
        color: #555;
        min-height: 100vh;
        font-weight: 300;
        font-family: Roboto, "Helvetica Neue", "Sukhumvit Set", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", sans-serif;

        background: #fbfcff;
      }

      * {
        box-sizing: border-box;
      }
    `
  }
})

export default enhance(App)
