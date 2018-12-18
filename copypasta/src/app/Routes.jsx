import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './AppContainer';
import MindmapContainer from '../features/mindmap/MindmapContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MindmapContainer} />
  </Route>
);

export default routes;
