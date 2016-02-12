import { observeStore } from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'COUNTER';

export class Component {
  _count = 0;

  setStore(store) {
    this._store = store;
  }

  render() {
    observeStore(this._store, state => state.counter, count => this._count = count);

    return (
      <div>
        <button data-click={COMP_ID + '_DECR'}>-</button>
        <span>{this._count}</span>
        <button data-click={COMP_ID + '_INCR'}>+</button>
      </div>
    );
  }
}

export class EventsHandlers {
  constructor(workerStore) {
    this._worker = workerStore;
  }

  register(eventsMap) {
    const clickEvents = [e => this._decr(e), e => this._incr(e)];
    eventsMap.set('click', clickEvents);
  }

  _decr(e) {
    const target = e.target;
    if (target['data-click'] === `${COMP_ID}_DECR`) {
      e.preventDefault();
      this._worker.dispatchEvent(ActionTypes.DECR, 1);
    }
  }
  _incr(e) {
    const target = e.target;
    if (target['data-click'] === `${COMP_ID}_INCR`) {
      e.preventDefault();
      this._worker.dispatchEvent(ActionTypes.INCR, 1);
    }
  }
}
