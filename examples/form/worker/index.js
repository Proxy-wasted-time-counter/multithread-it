import { init, subscribeAppToChanges } from '../../../src/worker';

import * as reducers from './reducers';
import * as Container from '../components/Container';

const app = new Container.Component();

subscribeAppToChanges(app, reducers);

