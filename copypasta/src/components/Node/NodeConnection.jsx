import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-konva';
import { includePosition } from '../../utils/anchor.util';
import { tryFindYWithOffset, tryFindXWithOffset } from '../../utils/node.util';

const findPoints = (startNode, nodes, connection) => {
  const startAnchor = startNode.anchors.find(a => a.id === connection.startAnchorId);
  const endNode = nodes.find(n => n.id === connection.endNodeId);
  const endAnchor = endNode.anchors.find(a => a.id === connection.endAnchorId);

  const startCenterX = startAnchor.x + (startAnchor.width / 2);
  const startCenterY = startAnchor.y + (startAnchor.height / 2);
  //
  // const endNodeX = tryFindXWithOffset(endNode);
  // const endNodeY = tryFindYWithOffset(endNode);

  const endCenterX = endAnchor.x + (endAnchor.width / 2);
  const endCenterY = endAnchor.y + (endAnchor.height / 2);

  return [startCenterX, startCenterY, endCenterX, endCenterY];
};

const NodeConnection = ({ node, nodes, connection }) =>
  <Line
    points={findPoints(node, nodes, connection)}
    fill={"#000000"}
    stroke={"#000000"}
    strokeWidth={1}
  />

NodeConnection.propTypes = {
  node: PropTypes.object.isRequired,
  connection: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  nodes: state.mindmap.mindmap.nodes,
});

export default connect(
  mapStateToProps,
  null
)(NodeConnection);
