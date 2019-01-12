import axios from 'axios'

import {Tile} from '.'

const getTile = (tile: Element): Tile => ({
  date: String(tile.getAttribute('data-date')),
  count: Number(tile.getAttribute('data-count'))
})

const withCORS = (url: string) =>
  'https://urlreq.appspot.com/req?method=GET&url=' + url

export async function fetchGarden(user: String): Promise<Tile[][]> {
  const endpoint = withCORS(`https://github.com/users/${user}/contributions`)
  const {data: html} = await axios.get(endpoint)

  const parser = new DOMParser()
  const dom = parser.parseFromString(html, 'text/html')

  const rows = Array.from(dom.querySelectorAll('.js-calendar-graph-svg g g'))

  return [...rows]
    .reverse()
    .map(week => Array.from(week.querySelectorAll('.day')).map(getTile))
}
