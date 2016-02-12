'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domDelegator = require('dom-delegator');

var _domDelegator2 = _interopRequireDefault(_domDelegator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (appContainer) {
  var delegator = new _domDelegator2.default();
  var eventsMap = new Map();

  return {
    register: function register(eventsHandler) {
      eventsHandler.register(eventsMap);
    },
    listen: function listen() {
      eventsMap.forEach(function (handler, evt) {
        delegator.addEventListener(appContainer, evt, function (e) {
          handler.forEach(function (h) {
            return h(e);
          });
        });
      });
    }
  };
};