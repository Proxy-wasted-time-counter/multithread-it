import { create, diff } from 'virtual-dom';
import {serialize as serializePatch} from 'vdom-serialized-patch';
import {fromJson, toJson} from 'vdom-as-json';

import { configureStore } from './store';
import * as WorkerMessageTypes from '../constants/WorkerMessageTypes';

let currentVdom;
let store;

onmessage = ({data}) => {
  switch (data.type) {
    case WorkerMessageTypes.INIT:
      currentVdom = fromJson(data.vdom);
      return;
    case WorkerMessageTypes.EVENT:
      store.dispatch({type: data.data.action, data: data.data.data});
      return;
    default:
      console.error('Don\'t know what to do with', data);
  }
};

const postMessageVdomPatches = patch => {
  postMessage({
    type: WorkerMessageTypes.VDOM_CHANGE,
    vdom: JSON.stringify(serializePatch(patch))
  });
};

export function subscribeAppToChanges(appToRegister, reducers) {
  store = configureStore(reducers);

  const app = appToRegister;
  app.setStore(store);
  app.initialize();
  let tree = app.render();

  const vdomChange = () => {
    const startRendering = performance.now();

    const newTree = app.render();
    const patch = diff(tree, newTree);
    postMessageVdomPatches(patch);

    tree = newTree;

    console.log('[WORKER] : App rendered in', performance.now() - startRendering);
  };
  store.subscribe(vdomChange);
  init(tree);
}

export function init(tree) {
  postMessage({
    type: WorkerMessageTypes.INIT_VDOM,
    vdom: toJson(tree)
  });
}
