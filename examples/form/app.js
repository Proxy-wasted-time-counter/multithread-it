import {h, create} from 'virtual-dom';
import { patch as applyPatch } from 'vdom-serialized-patch';

import multithreadIt from 'multithread-it';

import { EventsHandlers as ContainerEventsHandlers } from './components/Container';
import AppWorker from 'worker!./worker';

const appContainer = document.querySelector('#app-container');

multithreadIt.App(
  appContainer,
  ContainerEventsHandlers,
  AppWorker
);

