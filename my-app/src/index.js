import React from 'react';
import ReactDOM from 'react-dom';
import TestPage from './containers/TestPage';
import { Provider } from 'react-redux'
import configureStore from './store'


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
  	<TestPage />
  </Provider>,
  document.getElementById('root')
);
