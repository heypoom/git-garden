import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {GardenDisplay} from '../garden-display'

import {store} from '../store'

interface GardenPageProps {
  path: string
  user?: string
}

@observer
export default class GardenPage extends Component<GardenPageProps> {
  componentDidMount() {
    const {user} = this.props

    if (user) {
      console.log('User =', user)

      store.loadContributions(user)
    }
  }

  render() {
    const {total, contributions, activeTile} = store
    const {user} = this.props

    return (
      <div className="garden-page">
        <div>Garden of {user}</div>

        {total && <div>Contributions: {total}</div>}

        {activeTile && (
          <div>
            Contribution on {activeTile.date} = {activeTile.count}
          </div>
        )}

        <GardenDisplay select={store.select} contributions={contributions} />
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  window.store = store
}
