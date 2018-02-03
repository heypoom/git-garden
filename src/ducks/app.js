import axios from 'axios'
import {takeEvery, call, put} from 'redux-saga/effects'

import {createReducer, Creator} from './helper'

export const FETCH_GARDEN = 'FETCH_GARDEN'
export const SET_GARDEN = 'SET_GARDEN'

export const fetchGarden = Creator(FETCH_GARDEN)
export const setGarden = Creator(SET_GARDEN)

export function* fetchGardenSaga() {}

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
