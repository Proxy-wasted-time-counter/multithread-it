import * as ActionTypes from '../../constants/ActionTypes';

function incr(value) {
  return {
    type: ActionTypes.INCR,
    data: value
  };
}

function decr(value) {
  return {
    type: ActionTypes.DECR,
    data: value
  };
}

export default {
  [ActionTypes.INCR]: incr,
  [ActionTypes.DECR]: decr
};
