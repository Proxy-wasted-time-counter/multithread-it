import {
  MultithreadItComponent,
  MultithreadItEventsHandler
} from 'multithread-it';

import * as ActionTypes from '../../constants/ActionTypes';

const COMP_ID = 'FORM';

export class Component extends MultithreadItComponent {

  render() {
    return (
      <form name="example" data-submit={COMP_ID + '_SUBMIT'}>
        <input type="text" name="title" />
        <input type="text" name="description" />
        <input type="submit" name="add" defaultValue="Add" />
      </form>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler  {
  constructor(workerStore) {
    super(workerStore);
  }

  register(eventsMap) {
    const submitEvents = [e => this._submit(e)];
    eventsMap.set('submit', submitEvents);
  }

  _submit(e) {
    const target = e.target;
    if (target['data-submit'] === `${COMP_ID}_SUBMIT`) {
      e.preventDefault();
      const newData = {title: target.title.value, description: target.description.value};
      this._worker.dispatchEvent(ActionTypes.ADD_VALUE, newData);
    }
  }
}
