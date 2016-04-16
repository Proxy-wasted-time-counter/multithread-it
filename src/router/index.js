import MultithreadItComponent from '../component/MultithreadItComponent';
import MultithreadItEventsHandler from '../component/MultithreadItEventsHandler';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export class Component extends MultithreadItComponent {
  constructor(routesDefinition) {
    super();

    this._routeDefinition = routesDefinition;
  }

  render(routeId) {
    const routeConf = this._routeDefinition[routeId];
    if (!routeConf) {
      throw new Error('Missing route definition with id ${routeId}');
    }
    const componentInstance = new routeConf.component();
    componentInstance.setStore(this._store);
    componentInstance.initialize();

    return componentInstance.render();
  }
}

export class EventsHandler extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'click',
      e => this._click(e)
    );
    if (window.location.hash) {
      this._dispatchChangeRoute(
        window.location.hash.substring(location.hash.indexOf('#') + 1
      ));
    }
  }

  _click(e) {
    const target = e.target;
    if (target['data-click'] === CHANGE_ROUTE) {
      e.preventDefault();
      const link = target['data-link'];
      this._dispatchChangeRoute(link);
      window.location.hash = `#${link}`;

    }
  }
  _dispatchChangeRoute(route) {
    this._worker.dispatchEvent(CHANGE_ROUTE, route);
  }
}
