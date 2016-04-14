'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vdomAsJson = require('vdom-as-json');

var _WorkerMessageTypes = require('./constants/WorkerMessageTypes');

var WorkerMessageTypes = _interopRequireWildcard(_WorkerMessageTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkerStore = function () {
  function WorkerStore(initDom, onVDomChange, AppWorker) {
    _classCallCheck(this, WorkerStore);

    this._worker = new AppWorker();

    this._worker.onmessage = function (_ref) {
      var data = _ref.data;

      console.log('New message from appworker', data);
      switch (data.type) {
        case WorkerMessageTypes.INIT_VDOM:
          return initDom((0, _vdomAsJson.fromJson)(data.vdom));
        case WorkerMessageTypes.VDOM_CHANGE:
          return onVDomChange(JSON.parse(data.vdom));
        default:
          console.warn('unknown', data);
      }
    };
  }

  _createClass(WorkerStore, [{
    key: 'dispatchEvent',
    value: function dispatchEvent(action, data) {
      this._worker.postMessage({
        type: WorkerMessageTypes.EVENT,
        message: {
          action: action,
          data: data
        }
      });
    }
  }]);

  return WorkerStore;
}();

exports.default = WorkerStore;