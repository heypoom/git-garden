import {flatten} from 'ramda'
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
  date: Date
  count: number
}

const countContributions = (contributions: Contribution[]) =>
  contributions.map(c => c.count).reduce((a, b) => a + b, 0)

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

  @computed
  get contributionList(): Nullable<Contribution[]> {
    if (this.contributions.length === 0) return null

    return flatten<Contribution>(this.contributions)
  }

  @computed
  get monthlyContributions(): Contribution[] {
    const list = this.contributionList
    if (!list) return []

    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const isThisMonth = (c: Contribution) =>
      c.date.getMonth() === month && c.date.getFullYear() === year

    return list.filter(isThisMonth)
  }

  @computed
  get total(): number {
    return countContributions(this.contributionList || [])
  }

  @computed
  get monthlyTotal(): number {
    return countContributions(this.monthlyContributions)
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
