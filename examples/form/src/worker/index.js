import multithreadIt from 'multithread-it';

import * as reducers from './reducers';
import * as Container from '../components/Container';

const app = new Container.Component();

multithreadIt.Worker.subscribeAppToChanges(app, reducers);

