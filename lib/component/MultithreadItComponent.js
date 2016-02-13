'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('../worker/store');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component() {
    _classCallCheck(this, Component);
  }

  _createClass(Component, [{
    key: 'setStore',
    value: function setStore(store) {
      this._store = store;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      if (this.onInit) {
        this.onInit();
      }
    }
  }, {
    key: 'watch',
    value: function watch(select, onChange) {
      (0, _store.observeStore)(this._store, select, onChange);
    }
  }]);

  return Component;
}();

exports.default = Component;