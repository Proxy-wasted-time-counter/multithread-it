import * as ActionTypes from '../../constants/ActionTypes';

function add(value) {
  return {
    type: ActionTypes.ADD_VALUE,
    data: value
  };
}

export default {
  [ActionTypes.ADD_VALUE]: add
};
