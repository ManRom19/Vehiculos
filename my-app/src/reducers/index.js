import {combineReducers} from 'redux'
import testReducer from './testReducer'

const reducers = {
	testReducer
}

const appReducer = combineReducers(reducers)

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer