import { h, create } from 'virtual-dom';
import { patch as applyPatch } from 'vdom-serialized-patch';

import WorkerStore from './worker-store';
import eventsHandlerFactory from './events-handler';

let app;
export default function app(rootNode, AppEventsHandlers, AppWorker) {
  const initVdom = vdom => {
    rootNode.replaceChild(create(vdom), rootNode.firstElementChild);
    app = rootNode.firstElementChild;
    console.log('[MAIN] : App initialized in', performance.now());
  };
  const vdomChange = patch => {
    const startPatch = performance.now();
    rootNode = applyPatch(app, patch);
    console.log('[MAIN] : Patch applied in', performance.now() - startPatch);
  };
  const workerStore = new WorkerStore(initVdom, vdomChange, AppWorker);
  const appEvents = new AppEventsHandlers(workerStore);
  const eventsHandler = eventsHandlerFactory(rootNode);
  eventsHandler.register(appEvents);
  eventsHandler.listen();
}
