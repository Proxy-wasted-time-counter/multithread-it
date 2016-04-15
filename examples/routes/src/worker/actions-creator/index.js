import * as ActionTypes from '../../constants/ActionTypes';

function changeRoute(route) {
  return {
    type: ActionTypes.CHANGE_ROUTE,
    data: route
  };
}

export default {
  [ActionTypes.CHANGE_ROUTE]: changeRoute
};
