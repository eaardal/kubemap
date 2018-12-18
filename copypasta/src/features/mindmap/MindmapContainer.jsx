import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect } from 'react-konva';
import NodeContainer from '../../components/Node/NodeContainer';
import ViewNode from './viewNode/ViewNode';
import {
  toggleNodeModal,
  onNodeSaved,
  nodeMoved,
  saveNode,
  getMindmap,
  canvasClicked,
} from './mindmap.actions';
import ViewNodeContainer from './viewNode/ViewNodeContainer';
import { sanitizeNode } from '../../utils/mindmap.util';
import { applyOffset } from '../../utils/node.util';
import MousePositionRecorder from '../../utils/mousePositionRecorder.util';

class MindmapContainer extends React.Component {
  componentWillMount() {
    this.props.getMindmap(1);
  }

  render() {
    const {
      getMindmap,
      onToggleNodeModal,
      onSaveNode,
      onNodeDragEnd,
      onCanvasCliked,
      mindmap,
      anyNodeMoved,
    } = this.props;

    return (
      <div>
        <h1>{mindmap.title}</h1>
        <button
          disabled={!anyNodeMoved}
          onClick={evnt =>
            mindmap.nodes
              .filter(node => node.xOffset && node.yOffset)
              .map(node => {
                const adjustedNode = applyOffset(node);
                const cleanedNode = sanitizeNode(adjustedNode);
                onSaveNode(cleanedNode);
              })
        }>
          Save
        </button>
        <Stage
          width={700}
          height={700}
        >
          <Layer>
            {mindmap.nodes.map(node =>
              <NodeContainer
                key={node.id}
                node={node}
                onNodeClick={evnt => onToggleNodeModal(evnt.target.attrs.node)}
                onNodeDragEnd={evnt => {
                  console.log(evnt);
                  const nodeId = evnt.target.attrs.nodeId;
                  const xOffset = evnt.target.x();
                  const yOffset = evnt.target.y();
                  console.log('xOffset: ', xOffset);
                  console.log('yOffset: ', yOffset);
                  const newX = evnt.target.attrs.node.x + xOffset;
                  const newY = evnt.target.attrs.node.y + yOffset;
                  console.log('newX', newX);
                  console.log('newY', newY);
                  onNodeDragEnd(nodeId, xOffset, yOffset);
                }}
              />
            )}
          </Layer>
        </Stage>
        <ViewNodeContainer />
      </div>
    );
  }
}

MindmapContainer.propTypes = {
  mindmap: PropTypes.object.isRequired,
  onToggleNodeModal: PropTypes.func.isRequired,
  onNodeDragEnd: PropTypes.func.isRequired,
  onSaveNode: PropTypes.func.isRequired,
  onCanvasCliked: PropTypes.func.isRequired,
  getMindmap: PropTypes.func.isRequired,
  anyNodeMoved: PropTypes.bool,
};

const mapStateToProps = state => ({
  mindmap: state.mindmap.mindmap,
  anyNodeMoved: state.mindmap.anyNodeMoved,
});

const mapDispatchToProps = dispatch => ({
  onToggleNodeModal: node => dispatch(toggleNodeModal(node)),
  onSaveNode: node => dispatch(saveNode(node)),
  onNodeDragEnd: (nodeId, xOffset, yOffset) =>
    dispatch(nodeMoved(nodeId, xOffset, yOffset)),
  getMindmap: id => dispatch(getMindmap(id)),
  onCanvasCliked: target => dispatch(canvasClicked(target)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MindmapContainer);
