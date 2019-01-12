import {action} from 'mobx'

import {fetchGarden} from './fetchGarden'

declare global {
  interface Window {
    store: Store
  }
}

export interface Tile {
  date: string
  count: number
}

export class Store {
  garden: Tile[][] = []

  cursor = {
    row: 0,
    col: 0
  }

  @action
  loadGarden = async (user: string) => {
    this.garden = await fetchGarden(user)
  }
}

export const store = new Store()
