import multithreadIt from 'multithread-it';

import {Component as FormComponent, EventsHandlers as FormEvents} from './Form';
import {Component as ListComponent} from './List';

export class Component {
  _datas = [];

  constructor() {
    this._form = new FormComponent();
    this._list = new ListComponent();
  }
  setStore(store) {
    this._store = store;
  }

  render() {
    multithreadIt.observeStore(this._store, state => state.datas, datas => this._datas = datas);

    return (
      <div>
        <img src="images/walk.gif" />
        {this._form.render()}
        {this._list.render(this._datas)}
      </div>
    );
  }
}

export class EventsHandlers {
  constructor(workerStore) {
    this._worker = workerStore;
    this._formEvents = new FormEvents(this._worker);
  }

  register(eventsMap) {
    this._formEvents.register(eventsMap);
  }
}
