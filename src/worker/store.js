import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers } from 'redux';

const middleware = [thunk, createLogger({logger: self.console})];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export function configureStore(reducers, initialState) {
  return createStoreWithMiddleware(combineReducers(reducers), initialState);
}

export function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
