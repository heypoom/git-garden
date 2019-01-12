import React from 'react'

import {store} from '../store'

function Garden({path = '', id = ''}) {
  return <div>Garden of {id}</div>
}

if (typeof window !== 'undefined') {
  window.store = store
}

export default Garden
