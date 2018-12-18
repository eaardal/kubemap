import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import Node from './Node';
import NodeConnection from './NodeConnection';
import AnchorContainer from '../Anchor/AnchorContainer';
import AddNodeConnection from './AddNodeConnection';

const NodeContainer = ({ node, onNodeClick, onNodeDragEnd }) =>
  <Group draggable={true} nodeId={node.id} node={node} onDragEnd={onNodeDragEnd}>
    <Node
      node={node}
      onClick={onNodeClick}
    />
    <AnchorContainer anchors={node.anchors} parentNode={node} />
    {node.connections.map((conn, index) =>
      <NodeConnection
        key={`${node.id}_conn_${index}`}
        node={node}
        connection={conn}
      />
    )}
    <AddNodeConnection />
  </Group>

NodeContainer.propTypes = {
  node: PropTypes.object.isRequired,
  onNodeClick: PropTypes.func,
  onNodeDragEnd: PropTypes.func,
};

export default NodeContainer;
