import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { whatchFetchReg } from '../saga/saga';

import combineReducers from '../reducers/reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(whatchFetchReg);
export default store;
