"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventsHandler = function () {
  function EventsHandler(workerStore) {
    _classCallCheck(this, EventsHandler);

    this._events = new Map();

    this._worker = workerStore;
  }

  _createClass(EventsHandler, [{
    key: "addEventHandlers",
    value: function addEventHandlers(event) {
      var registeredHandlers = this._events.get(event) || [];

      for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        handlers[_key - 1] = arguments[_key];
      }

      var mergedHandlers = [].concat(_toConsumableArray(registeredHandlers), handlers);
      this._events.set(event, mergedHandlers);
    }
  }, {
    key: "register",
    value: function register(eventsMap) {
      this._events.forEach(function (handlers, eventKey) {
        var handlersArray = eventsMap.get(eventKey);
        if (!handlersArray) {
          handlersArray = [];
        }
        eventsMap.set(eventKey, [].concat(_toConsumableArray(handlersArray), _toConsumableArray(handlers)));
      });
    }
  }]);

  return EventsHandler;
}();

exports.default = EventsHandler;