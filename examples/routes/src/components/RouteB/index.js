import {
  MultithreadItComponent,
  MultithreadItEventsHandler,
  Router
} from 'multithread-it';

const COMP_ID = 'ROUTE_B';

export default class Component extends MultithreadItComponent {

  render() {
    return (
      <div>
        <h1>Route B</h1>
        <a href="#" data-click={Router.CHANGE_ROUTE} data-link="routeA">Go to route A</a>
      </div>
    );
  }
}
