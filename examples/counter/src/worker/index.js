import multithreadIt from 'multithread-it';

import * as reducers from './reducers';
import * as Counter from '../components/Counter';

const app = new Counter.Component();

multithreadIt.Worker.subscribeAppToChanges(app, reducers);

