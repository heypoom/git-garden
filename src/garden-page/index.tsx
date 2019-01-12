import React, {useEffect} from 'react'
import {observer} from 'mobx-react-lite'

import {store} from '../store'
import {GardenDisplay} from '../garden-display'

function Garden({path = '', user = ''}) {
  const {contributions} = store

  console.log('Contributions =', contributions)

  // prettier-ignore
  useEffect(() => {
    console.log('User =', user)

    store.loadContributions(user)
  }, [user])

  return (
    <div>
      <div>Garden of {user}</div>
      <div>Contributions: {contributions.length}</div>

      <GardenDisplay select={store.select} contributions={contributions} />
    </div>
  )
}

if (typeof window !== 'undefined') {
  window.store = store
}

export default observer(Garden)
