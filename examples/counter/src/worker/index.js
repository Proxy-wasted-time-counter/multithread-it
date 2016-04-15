import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import actionsCreator from './actions-creator';

import * as Counter from '../components/Counter';

const app = new Counter.Component();

Worker.subscribeAppToChanges(app, actionsCreator, reducers);
