import {flatten, groupBy} from 'ramda'
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

const groupByMonth = groupBy(
  (c: Contribution) => `${c.date.getMonth() + 1}-${c.date.getFullYear()}`
)

const sortContributionByDate = (a: Contribution, b: Contribution) =>
  b.date.getTime() - a.date.getTime()

interface MonthContributionMapping {
  [index: string]: Contribution[]
}

export class Store {
  @observable
  contributions: Contribution[][] = []

  @observable
  cursor = 0

  @computed
  get activeTile(): Nullable<Contribution> {
    if (this.contributions.length === 0) return null

    const list = this.contributionList || []

    return list.find(x => x.date.getTime() === this.cursor) || null
  }

  @computed
  get groupByMonth(): MonthContributionMapping {
    if (!this.contributionList) return {}

    const contributions = this.contributionList.sort(sortContributionByDate)

    return groupByMonth(contributions)
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

    return list.filter(isThisMonth).sort(sortContributionByDate)
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
  select = (date: Date) => {
    this.cursor = date.getTime()
  }
}

export const store = new Store()
