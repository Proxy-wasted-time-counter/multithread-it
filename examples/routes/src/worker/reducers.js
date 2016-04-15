import * as ActionTypes from '../constants/ActionTypes';

export function route(state = {current: 'routeA'}, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_ROUTE:
      return {
        ...state,
        current: action.data
      };
    default:
      return state;
  }
}
