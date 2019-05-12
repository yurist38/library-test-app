import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import rootReducer from './reducers';

const epicsMiddleware = createEpicMiddleware();
const enhancers = [applyMiddleware(epicsMiddleware)];

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(...enhancers),
);

epicsMiddleware.run(rootEpic);

export default store;
