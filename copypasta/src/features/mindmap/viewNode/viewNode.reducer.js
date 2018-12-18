import {
  TOGGLE_EDIT_READ_MODE,
  NODE_CONTENT_CHANGED,
} from './viewNode.actions';
import { NODE_MODAL_TOGGLE } from '../mindmap.actions';

const defaultState = {
  inEditMode: false,
  buttonText: 'Edit',
  node: null,
};

const viewNodeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NODE_CONTENT_CHANGED:
    return {
      ...state,
      node: {
        ...state.node,
        content: action.nodeContent,
      },
    };
    case NODE_MODAL_TOGGLE:
      return {
        ...state,
        node: action.node,
      };
    case TOGGLE_EDIT_READ_MODE: {
      const inEditMode = !state.inEditMode;
      return {
        ...state,
        inEditMode,
        buttonText: inEditMode ? 'Save' : 'Edit',
      };
    }
    default:
      return state;
  }
};

export default viewNodeReducer;
