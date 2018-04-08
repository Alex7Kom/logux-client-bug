import createLoguxCreator from 'logux-redux/create-logux-creator'

import log from 'logux-status/log';

import badgeMessages from 'logux-status/badge/en';
import badgeStyles from 'logux-status/badge/default';
import badge from 'logux-status/badge';

const createStore = createLoguxCreator({
  subprotocol: '1.0.0',
  server: 'ws://localhost:1337',
  userId: 1
});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_STATE':
      return action.value;
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.client.start();

store.client.log.add({ type: 'logux/subscribe', channel: 'user/1' }, {
  sync: true
});

badge(store.client, {
  position: 'bottom-left',
  messages: badgeMessages,
  styles: badgeStyles
});
log(store.client);

store.subscribe(() => {
  document.getElementById('root').innerHTML = '<code><pre>'
    + JSON.stringify(store.getState(), null, 2)
    + '</pre></code>'
    + 'OK, now duplicate the tab.';
});
