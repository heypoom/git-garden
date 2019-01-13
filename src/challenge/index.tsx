import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {Loader} from '../ui-loader'
import {GardenDisplay} from '../garden-display'

import {store} from '../store'

interface ChallengeProps {
  path: string
  user?: string
}

@observer
export default class ChallengePage extends Component<ChallengeProps> {
  componentDidMount() {
    const {user} = this.props

    if (user) {
      console.log('User =', user)

      store.loadContributions(user)
    }
  }

  render() {
    const {user} = this.props
    const {monthTotal, monthContributions} = store

    if (!user) {
      return <h1>Please login with GitHub to view your challenge page.</h1>
    }

    if (!monthContributions) return <Loader />

    return (
      <div>
        <h1>{user}'s #gitgardenchallenge page</h1>

        {monthTotal && <div>Contributions: {monthTotal}</div>}

        <GardenDisplay
          select={store.select}
          contributions={monthContributions}
        />
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  window.store = store
}
