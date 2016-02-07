import Delegator from 'dom-delegator';

export default appContainer => {
  const delegator =  new Delegator();
  const eventsMap = new Map();

  return {
    register: (eventsHandler) => {
      eventsHandler.register(eventsMap);
    },
    listen: () => {
      eventsMap.forEach((handler, evt) => {
        delegator.addEventListener(appContainer, evt, e => {
          handler.forEach(h => h(e));
        });
      });
    }
  };
};

