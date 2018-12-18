import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import browserHistory from 'history/lib/createBrowserHistory';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../infrastructure/store/configureStore';
import enableSockets from './socketBootstrapper';
import MousePositionRecorder from '../utils/mousePositionRecorder.util';

const store = configureStore();
const routerHistory = useRouterHistory(browserHistory)();
const history = syncHistoryWithStore(routerHistory, store);

const renderApp = () => {
  const RouterContainer = require('./RouterContainer').default;
  ReactDOM.render(
    <Provider store={store}>
      <RouterContainer history={history} />
    </Provider>,
    document.getElementById('app-container')
  );
};

enableSockets();
renderApp();
MousePositionRecorder.initialize();
MousePositionRecorder.attachToMouseMove();
