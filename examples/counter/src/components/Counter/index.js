import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'COUNTER';

export class Component extends MultithreadItComponent {
  _count = 0;

  onInit() {
    this.watch(
      state => state.counter,
      count => this._count = count
    );
  }

  render() {
    return (
      <div>
        <button data-click={COMP_ID + '_DECR'}>-</button>
        <span>{this._count}</span>
        <button data-click={COMP_ID + '_INCR'}>+</button>
      </div>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {

  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'click',
      e => this._decr(e),
      e => this._incr(e)
    );
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
