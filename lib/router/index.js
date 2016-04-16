'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsHandler = exports.Component = exports.CHANGE_ROUTE = undefined;

var _MultithreadItComponent = require('../component/MultithreadItComponent');

var _MultithreadItComponent2 = _interopRequireDefault(_MultithreadItComponent);

var _MultithreadItEventsHandler = require('../component/MultithreadItEventsHandler');

var _MultithreadItEventsHandler2 = _interopRequireDefault(_MultithreadItEventsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHANGE_ROUTE = exports.CHANGE_ROUTE = 'CHANGE_ROUTE';

var Component = exports.Component = function (_MultithreadItCompone) {
  _inherits(Component, _MultithreadItCompone);

  function Component(routesDefinition) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this));

    _this._routeDefinition = routesDefinition;
    return _this;
  }

  _createClass(Component, [{
    key: 'render',
    value: function render(routeId) {
      var routeConf = this._routeDefinition[routeId];
      if (!routeConf) {
        throw new Error('Missing route definition with id ${routeId}');
      }
      var componentInstance = new routeConf.component();
      componentInstance.setStore(this._store);
      componentInstance.initialize();

      return componentInstance.render();
    }
  }]);

  return Component;
}(_MultithreadItComponent2.default);

var EventsHandler = exports.EventsHandler = function (_MultithreadItEventsH) {
  _inherits(EventsHandler, _MultithreadItEventsH);

  function EventsHandler(workerStore) {
    _classCallCheck(this, EventsHandler);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(EventsHandler).call(this, workerStore));

    _this2.addEventHandlers('click', function (e) {
      return _this2._click(e);
    });
    if (window.location.hash) {
      _this2._dispatchChangeRoute(window.location.hash.substring(location.hash.indexOf('#') + 1));
    }
    return _this2;
  }

  _createClass(EventsHandler, [{
    key: '_click',
    value: function _click(e) {
      var target = e.target;
      if (target['data-click'] === CHANGE_ROUTE) {
        e.preventDefault();
        var link = target['data-link'];
        this._dispatchChangeRoute(link);
        window.location.hash = '#' + link;
      }
    }
  }, {
    key: '_dispatchChangeRoute',
    value: function _dispatchChangeRoute(route) {
      this._worker.dispatchEvent(CHANGE_ROUTE, route);
    }
  }]);

  return EventsHandler;
}(_MultithreadItEventsHandler2.default);