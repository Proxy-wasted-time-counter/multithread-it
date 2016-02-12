import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import * as Counter from '../components/Counter';

const app = new Counter.Component();

Worker.subscribeAppToChanges(app, reducers);

