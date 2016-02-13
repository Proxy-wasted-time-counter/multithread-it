export default class EventsHandler {
  _events = new Map();

  constructor(workerStore) {
    this._worker = workerStore;
  }

  addEventHandlers(event, ...handlers) {
    let registeredHandlers = this._events.get(event) || [];
    const mergedHandlers = [...registeredHandlers, ...handlers];
    this._events.set(event, mergedHandlers);
  }

  register(eventsMap) {
    this._events.forEach((handlers, eventKey) => {
      let handlersArray = eventsMap.get(eventKey);
      if (!handlersArray) {
        handlersArray = [];
      }
      eventsMap.set(eventKey, [...handlersArray, ...handlers]);
    });
  }
}
