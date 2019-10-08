import React, {Component} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react'

import {GardenDisplay} from '../garden-display'

import {store, Contribution} from '../store'
import {Loader} from '../ui-loader'

interface GardenPageProps {
  path: string
  user?: string
}

const ContributionDetail = styled.div`
  display: block;
  position: fixed;
  margin: 16px;
`

const TileInfo = ({date, count}: Contribution) => (
  <div>
    Contribution on {date.toLocaleDateString()} = {count}
  </div>
)

const sortMonth = (month: Contribution[]) =>
  month.sort((a, b) => a.date.getTime() - b.date.getTime())

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
    const {total, activeTile} = store
    const {user} = this.props

    const contributions = Object.values(store.groupByMonth).map(sortMonth)

    if (contributions.length === 0) return <Loader />

    return (
      <div>
        <ContributionDetail>

          <div>Garden of {user}</div>

          {total && <div>Contributions: {total}</div>}

          {activeTile && <TileInfo {...activeTile} />}

        </ContributionDetail>

        <GardenDisplay select={store.select} contributions={contributions} />
      </div>
    )
  }
}

if (typeof window !== 'undefined') {
  window.store = store
}
