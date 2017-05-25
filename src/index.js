import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'

//load reducer
import reducers from './reducers'

//load views
import Main from './views/Main.js';

const reducer = combineReducers({
  reducers
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Main />
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
