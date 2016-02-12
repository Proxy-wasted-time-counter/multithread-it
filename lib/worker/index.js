'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeAppToChanges = subscribeAppToChanges;
exports.init = init;

var _virtualDom = require('virtual-dom');

var _vdomSerializedPatch = require('vdom-serialized-patch');

var _vdomAsJson = require('vdom-as-json');

var _store = require('./store');

var _WorkerMessageTypes = require('../constants/WorkerMessageTypes');

var WorkerMessageTypes = _interopRequireWildcard(_WorkerMessageTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var currentVdom = undefined;
var store = undefined;

onmessage = function onmessage(_ref) {
  var data = _ref.data;

  switch (data.type) {
    case WorkerMessageTypes.INIT:
      currentVdom = (0, _vdomAsJson.fromJson)(data.vdom);
      return;
    case WorkerMessageTypes.EVENT:
      store.dispatch({ type: data.data.action, data: data.data.data });
      return;
    default:
      console.error('Don\'t know what to do with', data);
  }
};

var postMessageVdomPatches = function postMessageVdomPatches(patch) {
  postMessage({
    type: WorkerMessageTypes.VDOM_CHANGE,
    vdom: JSON.stringify((0, _vdomSerializedPatch.serialize)(patch))
  });
};

function subscribeAppToChanges(appToRegister, reducers) {
  store = (0, _store.configureStore)(reducers);

  var app = appToRegister;
  app.setStore(store);
  var tree = app.render();

  var vdomChange = function vdomChange() {
    var startRendering = performance.now();

    var newTree = app.render();
    var patch = (0, _virtualDom.diff)(tree, newTree);
    postMessageVdomPatches(patch);

    tree = newTree;

    console.log('[WORKER] : App rendered in', performance.now() - startRendering);
  };
  store.subscribe(vdomChange);
  init(tree);
}

function init(tree) {
  postMessage({
    type: WorkerMessageTypes.INIT_VDOM,
    vdom: (0, _vdomAsJson.toJson)(tree)
  });
}