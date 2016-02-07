import {h, create} from 'virtual-dom';
import { patch as applyPatch } from 'vdom-serialized-patch';

import app from '../../src';
import WorkerStore from '../../src/worker-store';

import { EventsHandlers as ContainerEventsHandlers } from './components/Container';
import AppWorker from 'worker!./worker';

let appContainer = document.querySelector('#app-container');
app(appContainer, ContainerEventsHandlers, AppWorker);

