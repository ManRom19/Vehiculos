import { call, takeEvery } from 'redux-saga/effects'
import getTest from '../services/getTest'

export function * fetchTest () {
  try {
    const result = yield call(getTest)
    alert(result)
  } catch (error) {
    console.log(error)
  }
}

export function * watchFetchTest () {
  yield takeEvery('FETCH_TEST_INFO', fetchTest)
}