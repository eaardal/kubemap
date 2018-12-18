import actionFactory from '../../utils/actionFactory';
import MindmapChannel from './mindmap.channel';
import MousePositionRecorder from '../../utils/mousePositionRecorder.util';

export const NODE_MODAL_TOGGLE = 'NODE_MODAL_TOGGLE';
export const SAVE_NODE_RESULT = 'SAVE_NODE_RESULT';
export const GET_MINDMAP_REQUEST = 'GET_MINDMAP_REQUEST';
export const GET_MINDMAP_RESPONSE = 'GET_MINDMAP_RESPONSE';
export const NODE_MOVED = 'NODE_MOVED';
export const NODE_ANCHOR_CLICKED = 'NODE_ANCHOR_CLICKED';

export const toggleNodeModal = actionFactory(NODE_MODAL_TOGGLE, 'node');
export const nodeMoved = actionFactory(NODE_MOVED, 'nodeId', 'xOffset', 'yOffset');
export const nodeAnchorClick = (anchor, parentNode) =>
  (dispatch, getCurrentState) => {
    const state = getCurrentState().mindmap;

    if (!state.isAddingConnection) {
      MousePositionRecorder.enableRecording();
    } else {
      MousePositionRecorder.disableRecording();
    }

    dispatch(actionFactory(NODE_ANCHOR_CLICKED, 'anchor', 'parentNode')(anchor, parentNode));
  };

export const getMindmapRequest = actionFactory(GET_MINDMAP_REQUEST, 'id');
export const getMindmapResponse = actionFactory(GET_MINDMAP_RESPONSE, 'mindmap');
export const getMindmap = mindmapId =>
  dispatch => {
    dispatch(getMindmapRequest(mindmapId));
    MindmapChannel.getMindmap(mindmapId);
  };
export const onGetMindmap = mindmap => dispatch => dispatch(getMindmapResponse(mindmap));

export const saveNode = node => dispatch => MindmapChannel.saveNode(node);
export const onNodeSaved = node => dispatch => dispatch(nodeSaved(node));
export const nodeSaved = actionFactory(SAVE_NODE_RESULT, 'node');
