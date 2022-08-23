import {createStore, applyMiddleware, compose} from 'redux'
import {HashRouter} from 'react-router-dom'
import {routerMiddleware as createRouterMiddleware} from 'react-router-redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

const routerMiddleware = createRouterMiddleware(HashRouter)

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify here name, actionsBlacklist, actionsCreators and other options
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, routerMiddleware)
)

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    )
  }

  sagaMiddleware.run(rootSagas)

  return store
}

export default configureStore