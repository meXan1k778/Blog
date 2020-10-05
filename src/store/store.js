import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { whatchFetchReg } from '../saga/saga';

import Reducers from '../reducers/reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));
sagaMiddleware.run(whatchFetchReg);
export default store;
