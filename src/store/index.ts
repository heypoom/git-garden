import {action, observable} from 'mobx'

import {fetchContributions} from './fetchContributions'

declare global {
  interface Window {
    store: Store
  }
}

export interface Contribution {
  date: string
  count: number
}

export class Store {
  @observable
  contributions: Contribution[][] = []

  @observable
  cursor = {
    row: 0,
    col: 0
  }

  @action
  loadContributions = async (user: string) => {
    this.contributions = await fetchContributions(user)
  }

  @action
  select = (row: number, col: number) => {
    this.cursor = {row, col}
  }
}

export const store = new Store()
