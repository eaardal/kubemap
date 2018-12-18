import {
  NODE_MODAL_TOGGLE,
  SAVE_NODE_RESULT,
  GET_MINDMAP_REQUEST,
  GET_MINDMAP_RESPONSE,
  NODE_MOVED,
  NODE_ANCHOR_CLICKED,
} from './mindmap.actions';
import { findCenterX, findCenterY, findX, findY } from '../../utils/anchor.util';
import { createConnection, tryFindXWithOffset, tryFindYWithOffset } from '../../utils/node.util';

const defaultState = {
  showNodeModal: false,
  mindmap: { nodes: [] },
  anyNodeMoved: false,
};

const addConnectionBetweenAnchors = (state, action) => {
  const nodes = state.mindmap.nodes.map(node => {
    if (node.id === state.addConnectionStartAnchor.parentId) {
      const offsetAdjusterAnchor = {
        ...action.anchor,
        parentX: tryFindXWithOffset(action.parentNode),
        parentY: tryFindYWithOffset(action.parentNode),
      };
      const newConn = createConnection(state.addConnectionStartAnchor, offsetAdjusterAnchor);
      return {
        ...node,
        connections: [
          ...node.connections,
          newConn,
        ],
      };
    }
    return node;
  })
  const newState = {
    ...state,
    mindmap: {
      ...state.mindmap,
      nodes,
    },
  };
  delete newState.isAddingConnection;
  delete newState.addConnectionStartPos;
  return newState;
};

const startAddingConnection = (state, action) => {
  // const offsetAdjustedAnchor = {
  //   ...action.anchor,
  //   parentX: parentNode.x,
  //   parentY: parentNode.y,
  // };
  // console.log('offsetAdjustedAnchor', offsetAdjustedAnchor);
  // const a2 = {
  //   ...offsetAdjustedAnchor,
  //   x: findX(offsetAdjustedAnchor),
  //   y: findY(offsetAdjustedAnchor),
  // };
  //console.log('a2', a2);
  console.log('NODE_ANCHOR_CLICKED startpos', {x: action.anchor.x, y: action.anchor.y});
  return {
    ...state,
    isAddingConnection: true,
    addConnectionStartAnchor: { ...action.anchor },
    addConnectionStartPos: {
      x: findCenterX(action.anchor),
      y: findCenterY(action.anchor),
    },
  };
};

const reduceNodeAnchorClicked = (state, action) => {
  if (state.isAddingConnection) {
    return addConnectionBetweenAnchors(state, action);
  }
  return startAddingConnection(state, action);
};

const mindmapReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NODE_ANCHOR_CLICKED: {
      return reduceNodeAnchorClicked(state, action);
    }
    case GET_MINDMAP_REQUEST: {
      return {
        ...state,
        mindmap: {
          ...state.mindmap,
          title: `=== LOADING MINDMAP ${action.id} ===`,
        }
      }
    }
    case GET_MINDMAP_RESPONSE: {
      if (!action.mindmap) {
        return state;
      }
      const m = {
        ...action.mindmap,
        nodes: action.mindmap.nodes.map(node => ({
          ...node,
          x: node.startX,
          y: node.startY,
          anchors: node.anchors.map(anchor => ({
            ...anchor,
            parentHeight: node.height,
            parentWidth: node.width,
            parentStartX: node.startX,
            parentStartY: node.startY,
            parentX: node.startX,
            parentY: node.startY,
            height: 10,
            width: 10,
          })),
        })),
      };
      const m2 = {
        ...m,
        nodes: m.nodes.map(node => ({
          ...node,
          anchors: node.anchors.map(anchor => ({
            ...anchor,
            x: findX(anchor),
            y: findY(anchor),
            startX: findX(anchor),
            startY: findY(anchor),
          })),
        })),
      };
      return {
        ...state,
        mindmap: m2,
      };
    }
    case NODE_MOVED: {
      let anyNodeMoved = false;
      const nodes = state.mindmap.nodes.map(node => {
        if (node.id === action.nodeId) {
          anyNodeMoved = true;
          const n1 = {
            ...node,
            x: node.startX + action.xOffset,
            y: node.startY + action.yOffset,
            xOffset: action.xOffset,
            yOffset: action.yOffset,
            anchors: node.anchors.map(anchor => ({
              ...anchor,
              parentX: node.startX + action.xOffset,
              parentY: node.startY + action.yOffset,
            })),
          };
          const n2 = {
            ...n1,
            anchors: n1.anchors.map(anchor => ({
              ...anchor,
              x: findX(anchor),
              y: findY(anchor),
            })),
          };
          return n2;
        }
        return node;
      });
      console.log('NODE_MOVED result', nodes);
      return {
        ...state,
        anyNodeMoved,
        mindmap: {
          ...state.mindmap,
          nodes,
        },
      };
    }
    case SAVE_NODE_RESULT: {
      const nodes = state.mindmap.nodes.map(node => {
        if (node.id === action.node.id){
          return { ...action.node };
        }
        return node;
      });
      return {
        ...state,
        mindmap: {
          ...state.mindmap,
          nodes,
        },
      };
    }
    case NODE_MODAL_TOGGLE: {
      const showNodeModal = !state.showNodeModal;
      return {
        ...state,
        showNodeModal,
        nodeToOpenInModal: showNodeModal ? action.node : null,
      };
    }
    default:
      return state;
  }
};

export default mindmapReducer;
