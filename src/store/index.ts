import {action, computed, observable} from 'mobx'

import {fetchContributions} from './fetchContributions'

import {Nullable} from '../common/types'

// Inject store into global
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

  @computed
  get activeTile(): Nullable<Contribution> {
    if (this.contributions.length === 0) return null

    const {row, col} = this.cursor

    return this.contributions[row][col]
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
