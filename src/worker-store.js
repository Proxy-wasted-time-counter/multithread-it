import { fromJson } from 'vdom-as-json';
import * as WorkerMessageTypes from './constants/WorkerMessageTypes';

export default class WorkerStore {

  constructor(initDom, onVDomChange, AppWorker) {
    this._worker = new AppWorker();

    this._worker.onmessage = ({data}) => {
      console.log('New message from appworker', data);
      switch (data.type) {
        case WorkerMessageTypes.INIT_VDOM:
          return initDom(fromJson(data.vdom));
        case WorkerMessageTypes.VDOM_CHANGE:
          return onVDomChange(JSON.parse(data.vdom));
        default:
          console.warn('unknown', data);
      }
    };
  }

  dispatchEvent(action, data) {
    this._worker.postMessage({
      type: WorkerMessageTypes.EVENT,
      message: {
        action,
        data
      }
    });
  }
}
