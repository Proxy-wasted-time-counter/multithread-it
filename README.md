# Multithread-it
## A components oriented virtual dom in a worker rendering solution

**Multithread-it** help you writing web components wich do not block UI.
This component will be rendered in a web-worker.

Components are written with [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and [JSX](https://github.com/facebook/jsx).

Events are propagated from the UI thread to the application worker using an abstraction over [Redux](https://github.com/rackt/redux).

### Example

Your component is the composition of element.

A `Component` working in the application WebWorker
```jsx
import multithreadIt from 'multithread-it';

class Component {
  _label; 
  setStore(store) {
    this._store = store;
  }

  render() {
    multithreadIt.observeStore(
        this._store,
        state => state.label,
        label => this._label = label
    );

    return (
      <div>
        {this._label}
        <button data-click="EVENT_CLICK">-</button>
      </div>
    );
  }
}
```

An `EventsHandlers` listening to component events in the UI-thread
```jsx
class EventsHandlers {
  constructor(workerStore) {
    this._worker = workerStore;
  }

  register(eventsMap) {
    const clickEvents = [e => this._click(e)];
    eventsMap.set('click', clickEvents);
  }

  _click(e) {
    const target = e.target;
    if (target['data-click'] === 'EVENT_CLICK') {
      e.preventDefault();
      this._worker.dispatchEvent('click', 'clicked');
    }
  }
}
```

Then, in the application WebWorker a Redux reducer will process events.
```js

function label(state = 'Initialized', action) {
  switch (action.type) {
    case 'click':
      return state = action.data;
    default:
      return state;
  }
}
```

For more informations about how **Multithread-it** should be used.
Have a look to examples:
 - [Simple Counter](https://github.com/Proxy-wasted-time-counter/multithread-it/tree/master/examples/counter)
 - [Form](https://github.com/Proxy-wasted-time-counter/multithread-it/tree/master/examples/form)