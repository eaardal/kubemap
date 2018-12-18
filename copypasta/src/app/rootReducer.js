import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import mindmapReducer from '../features/mindmap/mindmap.reducer';
import viewNodeReducer from '../features/mindmap/viewNode/viewNode.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  mindmap: mindmapReducer,
  viewNodeModal: viewNodeReducer,
});

export default rootReducer;
