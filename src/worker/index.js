import { create, diff } from 'virtual-dom';
import {serialize as serializePatch} from 'vdom-serialized-patch';
import { fromJson, toJson } from 'vdom-as-json';

import { configureStore } from './store';
import cache from './cache-creator';

import * as WorkerMessageTypes from '../constants/WorkerMessageTypes';

const APP = 'app';
const VDOM = 'VDOM';

let currentVdom;
let store;
let reduxActionsCreator;

onmessage = ({data}) => {
  switch (data.type) {
    case WorkerMessageTypes.INIT:
      currentVdom = fromJson(data.vdom);
      return;
    case WorkerMessageTypes.EVENT:
      store.dispatch(
        reduxActionsCreator[data.message.action](data.message.data)
      );
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

export function subscribeAppToChanges(appToRegister, actionsCreator, reducers, initialState) {
  let tree;

  store = configureStore(reducers, initialState);
  reduxActionsCreator = actionsCreator;

  const app = appToRegister;
  app.setStore(store);
  app.initialize();

  initFromCache(startTime)
  .then(vdom => {
    tree = fromJson(vdom);
  })
  .catch(() => {
    tree = app.render();
    init(toJson(tree));
  });

  const vdomChange = () => {
    const startRendering = performance.now();

    const newTree = app.render();
    const patch = diff(tree, newTree);
    postMessageVdomPatches(patch);

    tree = newTree;
    cache(APP)
    .then(appCache => {
      appCache.setItem(VDOM, toJson(tree));
    })
    .catch(err => console.error(err));
  };

  store.subscribe(vdomChange);
  return store;
}

export function init(jsonVdom) {
  postMessage({
    type: WorkerMessageTypes.INIT_VDOM,
    vdom: jsonVdom
  });
}

function initFromCache(startTime) {

  return cache(APP)
  .then(appCache => {
    return appCache.getItem(VDOM);
  })
  .then(vdom => {
    if (vdom) {
      init(vdom);
      return Promise.resolve(vdom);
    } else {
      return Promise.reject();
    }
  });
}
