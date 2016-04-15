import { Worker } from 'multithread-it';

import * as reducers from './reducers';
import actionsCreator from './actions-creator';

import { Component as ContainerComponent } from '../components/Container';

const app = new ContainerComponent();

Worker.subscribeAppToChanges(app, actionsCreator, reducers);
