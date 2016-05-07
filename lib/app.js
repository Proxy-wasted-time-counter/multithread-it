'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = app;

var _virtualDom = require('virtual-dom');

var _vdomSerializedPatch = require('vdom-serialized-patch');

var _workerStore = require('./worker-store');

var _workerStore2 = _interopRequireDefault(_workerStore);

var _eventsHandler = require('./events-handler');

var _eventsHandler2 = _interopRequireDefault(_eventsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = undefined;
function app(rootNode, AppEventsHandlers, AppWorker) {
  var initVdom = function initVdom(vdom) {
    rootNode.replaceChild((0, _virtualDom.create)(vdom), rootNode.firstElementChild);
    exports.default = app = rootNode.firstElementChild;
    console.log('[MAIN] : App initialized in', performance.now());
  };
  var vdomChange = function vdomChange(patch) {
    var startPatch = performance.now();
    rootNode = (0, _vdomSerializedPatch.patch)(app, patch);
    console.log('[MAIN] : Patch applied in', performance.now() - startPatch);
  };
  var workerStore = new _workerStore2.default(initVdom, vdomChange, AppWorker);
  var appEvents = new AppEventsHandlers(workerStore);
  var eventsHandler = (0, _eventsHandler2.default)(rootNode);
  eventsHandler.register(appEvents);
  eventsHandler.listen();
}