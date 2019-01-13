import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import {store} from '../store'
import {GardenDisplay} from '../garden-display'

interface GardenPageProps {
  path: string
  user?: string
}

function GardenPage({user = ''}: GardenPageProps) {
  const {total, contributions, activeTile} = store

  // prettier-ignore
  useEffect(() => {
    console.log('User =', user)

    store.loadContributions(user)
  }, [user])

  return (
    <div>
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

if (typeof window !== 'undefined') {
  window.store = store
}

export default observer(GardenPage)
