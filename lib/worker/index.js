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

var _cacheCreator = require('./cache-creator');

var _cacheCreator2 = _interopRequireDefault(_cacheCreator);

var _WorkerMessageTypes = require('../constants/WorkerMessageTypes');

var WorkerMessageTypes = _interopRequireWildcard(_WorkerMessageTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP = 'app';
var VDOM = 'VDOM';

var currentVdom = undefined;
var store = undefined;
var reduxActionsCreator = undefined;

onmessage = function onmessage(_ref) {
  var data = _ref.data;

  switch (data.type) {
    case WorkerMessageTypes.INIT:
      currentVdom = (0, _vdomAsJson.fromJson)(data.vdom);
      return;
    case WorkerMessageTypes.EVENT:
      store.dispatch(reduxActionsCreator[data.message.action](data.message.data));
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

function subscribeAppToChanges(appToRegister, actionsCreator, reducers, initialState) {
  var tree = undefined;

  store = (0, _store.configureStore)(reducers, initialState);
  reduxActionsCreator = actionsCreator;

  var app = appToRegister;
  app.setStore(store);
  app.initialize();

  initFromCache(startTime).then(function (vdom) {
    tree = (0, _vdomAsJson.fromJson)(vdom);
  }).catch(function () {
    tree = app.render();
    init((0, _vdomAsJson.toJson)(tree));
  });

  var vdomChange = function vdomChange() {
    var startRendering = performance.now();

    var newTree = app.render();
    var patch = (0, _virtualDom.diff)(tree, newTree);
    postMessageVdomPatches(patch);

    tree = newTree;
    (0, _cacheCreator2.default)(APP).then(function (appCache) {
      appCache.setItem(VDOM, (0, _vdomAsJson.toJson)(tree));
    }).catch(function (err) {
      return console.error(err);
    });
  };

  store.subscribe(vdomChange);
  return store;
}

function init(jsonVdom) {
  postMessage({
    type: WorkerMessageTypes.INIT_VDOM,
    vdom: jsonVdom
  });
}

function initFromCache(startTime) {

  return (0, _cacheCreator2.default)(APP).then(function (appCache) {
    return appCache.getItem(VDOM);
  }).then(function (vdom) {
    if (vdom) {
      init(vdom);
      return Promise.resolve(vdom);
    } else {
      return Promise.reject();
    }
  });
}