import {
  MultithreadItComponent,
  MultithreadItEventsHandler,
  Router
} from 'multithread-it';

const COMP_ID = 'ROUTE_A';

export default class Component extends MultithreadItComponent {

  render() {
    return (
      <div>
        <h1>Route A</h1>
        <a href="#" data-click={Router.CHANGE_ROUTE} data-link="routeB">Go to route B</a>
      </div>
    );
  }
}
