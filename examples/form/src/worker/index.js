import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import { Component as ContainerComponent } from '../components/Container';

const app = new ContainerComponent();

Worker.subscribeAppToChanges(app, reducers);

