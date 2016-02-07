import app from '../../src';

import { EventsHandlers as CounterEventsHandlers } from './components/Counter';
import AppWorker from 'worker!./worker';

let appContainer = document.querySelector('#app-container');

app(appContainer, CounterEventsHandlers, AppWorker);
