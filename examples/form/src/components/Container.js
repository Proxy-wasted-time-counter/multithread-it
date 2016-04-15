import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import {Component as FormComponent, EventsHandlers as FormEvents} from './Form';
import {Component as ListComponent} from './List';

export class Component extends MultithreadItComponent {
  _datas = [];

  constructor() {
    super();

    this._form = new FormComponent();
    this._list = new ListComponent();
  }

  onInit() {
    this.watch(
      state => state.datas,
      datas => this._datas = datas
    );
  }

  render() {

    return (
      <div>
        <img src="images/walk.gif" />
        {this._form.render()}
        {this._list.render(this._datas)}
      </div>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._formEvents = new FormEvents(this._worker);
  }

  register(eventsMap) {
    this._formEvents.register(eventsMap);
  }
}
