import * as ActionTypes from '../constants/ActionTypes';
import { list as initDatas } from './datas.json';

export function datas(state = initDatas, action) {
  switch (action.type) {
    case ActionTypes.ADD_VALUE:
      return [action.data, ...state];
    default:
      return state;
  }
}
