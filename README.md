# Multithread-it
## A components oriented virtual dom in a worker rendering solution

**Multithread-it** help you writing web components wich do not block UI.
This component will be rendered in a web-worker.

Components are written with [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and [JSX](https://github.com/facebook/jsx).

Events are propagated from the UI thread to the application worker using an abstraction over [Redux](https://github.com/rackt/redux).

### Example

Your component is the composition of two elements.

A `Component` working in the application WebWorker
```jsx
import { MultithreadItComponent } from 'multithread-it';

class Component extends MultithreadItComponent {
  _label; 

  onInit() {
    this.watch(
      state => state.label,
      label => this._label = label
    );
  }

  render() {
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
import { MultithreadItEventsHandler } from 'multithread-it';

class EventsHandlers  extends MultithreadItEventsHandler {
  constructor(workerStore) {
    super(workerStore);

    this.addEventHandlers(
      'click',
      e => this._click(e)
    );
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