import {action} from 'mobx'
import axios from 'axios'

interface Tile {
  date: string
  count: number
}

const getTile = (tile: Element): Tile => ({
  date: String(tile.getAttribute('data-date')),
  count: Number(tile.getAttribute('data-count'))
})

export async function fetchGarden(user: String): Promise<Tile[][]> {
  const {data: html} = await axios.get(
    `https://github.com/users/${user}/contributions`
  )
  const parser = new DOMParser()
  const dom = parser.parseFromString(html, 'text/html')

  const rows = Array.from(dom.querySelectorAll('.js-calendar-graph-svg g g'))

  return [...rows]
    .reverse()
    .map(week => Array.from(week.querySelectorAll('.day')).map(getTile))
}

export class Store {
  garden: Tile[][] = []

  cursor = {row: 0, col: 0}

  @action
  loadGarden = async (user: string) => {
    this.garden = await fetchGarden(user)
  }
}

export const store = new Store()
