import * as ActionTypes from '../constants/ActionTypes';

export function counter(state = 0, action) {
  switch (action.type) {
    case ActionTypes.INCR:
      return state + action.data;
    case ActionTypes.DECR:
      return state - action.data;
    default:
      return state;
  }
}
