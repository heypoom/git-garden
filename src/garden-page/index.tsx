import React, {Component} from 'react'
import {observer} from 'mobx-react'

import {GardenDisplay} from '../garden-display'

import {store, Contribution} from '../store'
import {Loader} from '../ui-loader'

interface GardenPageProps {
  path: string
  user?: string
}

const TileInfo = ({date, count}: Contribution) => (
  <div>
    Contribution on {date.toLocaleDateString()} = {count}
  </div>
)

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

    if (contributions.length === 0) return <Loader />

    return (
      <div>
        <div>Garden of {user}</div>

        {total && <div>Contributions: {total}</div>}

        {activeTile && <TileInfo {...activeTile} />}

        <GardenDisplay select={store.select} contributions={contributions} />
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  window.store = store
}
