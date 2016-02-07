import multithreadIt from 'multithread-it';

import { EventsHandlers as CounterEventsHandlers } from './components/Counter';
import AppWorker from 'worker!./worker';

const appContainer = document.querySelector('#app-container');

multithreadIt.App(
  appContainer,
  CounterEventsHandlers,
  AppWorker
);
