import {
  MultithreadItComponent,
  MultithreadItEventsHandler,
  Router
} from 'multithread-it';

import RouteA from './RouteA';
import RouteB from './RouteB';

export class Component extends MultithreadItComponent {

  constructor() {
    super();
    this._router = new Router.Component({
      routeA: {component: RouteA},
      routeB: {component: RouteB},
    });
  }

  onInit() {
    this.watch(
      state => state.route.current,
      currentRoute => this._routeId = currentRoute
    );
  }

  render() {

    return (
      <div>
        {this._router.render(this._routeId)}
      </div>
    );
  }
}

export class EventsHandlers extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this._routerEvents = new Router.EventsHandler(this._worker);

  }

  register(eventsMap) {
    this._routerEvents.register(eventsMap);
  }
}
