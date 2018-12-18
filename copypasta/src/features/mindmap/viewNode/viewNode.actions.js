import actionFactory from '../../../utils/actionFactory';

export const TOGGLE_EDIT_READ_MODE = 'TOGGLE_EDIT_READ_MODE';
export const NODE_CONTENT_CHANGED = 'NODE_CONTENT_CHANGED';

export const toggleMode =
  actionFactory(TOGGLE_EDIT_READ_MODE);

export const nodeContentChanged =
  actionFactory(NODE_CONTENT_CHANGED, 'nodeContent');
