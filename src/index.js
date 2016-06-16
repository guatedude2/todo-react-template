import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './store';
import routes from './routes';

// create browser history with the app.route basename
const browserHistory = useRouterHistory(createHistory)({
  basename: '/'
});

// create store
const store = createStore();

// sync browser history with store
const history = syncHistoryWithStore(browserHistory, store);

// render app router
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app-container')
);