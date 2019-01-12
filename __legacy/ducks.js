import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from '../../src-old/ducks/helper'

export const FETCH_GARDEN = 'FETCH_GARDEN'
export const SET_GARDEN = 'SET_GARDEN'
export const SELECT = 'SELECT'

export const fetchGarden = Creator(FETCH_GARDEN)
export const setGarden = Creator(SET_GARDEN)
export const select = Creator(SELECT, 'row', 'col')

const endpoint =
  'https://urlreq.appspot.com/req?method=GET&url=https://github.com/'

const getTile = tile => ({
  date: tile.getAttribute('data-date'),
  count: parseInt(tile.getAttribute('data-count')),
})

export function* fetchGardenSaga({payload}) {
  const {data: html} = yield call(axios.get, endpoint + payload)
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(html, 'text/html')

  const rows = dom
    .querySelector('.js-calendar-graph-svg')
    .querySelector('g')
    .querySelectorAll('g')

  const contributions = [...rows]
    .reverse()
    .map(week => [...week.querySelectorAll('.day')].map(getTile))

  console.log(contributions)

  yield put(setGarden(contributions))
}

export function* appWatcherSaga() {
  yield takeEvery(FETCH_GARDEN, fetchGardenSaga)
}

const initial = {
  garden: [],
  cursor: {row: 0, col: 0},
}

export default createReducer(initial, state => ({
  [SET_GARDEN]: garden => ({
    ...state,
    garden,
  }),
  [SELECT]: ({row, col}) => ({
    ...state,
    cursor: {row, col},
  }),
}))
