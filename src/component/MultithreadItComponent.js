import { observeStore } from '../worker/store';

export default class Component {

  setStore(store) {
    this._store = store;
  }

  initialize() {
    if (this.onInit) {
      this.onInit();
    }
  }

  watch(select, onChange) {
    observeStore(this._store, select, onChange);
  }
}
