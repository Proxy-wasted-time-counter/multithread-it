import { init, subscribeAppToChanges } from '../../../src/worker';

import * as reducers from './reducers';
import * as Counter from '../components/Counter';

const app = new Counter.Component();

subscribeAppToChanges(app, reducers);

