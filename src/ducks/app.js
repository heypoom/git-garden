import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from './helper'

export const FETCH_GARDEN = 'FETCH_GARDEN'
export const SET_GARDEN = 'SET_GARDEN'

export const fetchGarden = Creator(FETCH_GARDEN)
export const setGarden = Creator(SET_GARDEN)

const endpoint =
  'https://urlreq.appspot.com/req?method=GET&url=https://github.com/'

export function* fetchGardenSaga({payload}) {
  const {data: html} = yield call(axios.get, endpoint + payload)
  const parser = new window.DOMParser()
  const dom = parser.parseFromString(html, 'text/html')

  const tiles = dom
    .querySelector('.js-calendar-graph-svg')
    .querySelectorAll('rect.day')

  const contributions = [...tiles].map(x => ({
    date: x.getAttribute('data-date'),
    count: parseInt(x.getAttribute('data-count')),
  }))

  yield put(setGarden(contributions))
}

export function* appWatcherSaga() {
  yield takeEvery(FETCH_GARDEN, fetchGardenSaga)
}

const initial = {
  garden: [],
}

export default createReducer(initial, state => ({
  [SET_GARDEN]: garden => ({
    ...state,
    garden,
  }),
}))
