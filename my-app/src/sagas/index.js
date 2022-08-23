import { fork, all } from 'redux-saga/effects'
import {watchFetchTest} from './fetchTest'

export default function * root () {
  yield all([
    fork(watchFetchTest)
  ])
}