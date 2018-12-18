import React, { PropTypes } from 'react';
import { Group } from 'react-konva';
import NodeRect from './NodeRect';
import NodeTitle from './NodeTitle';
import NodeSummary from './NodeSummary';

const Node = ({ node, onClick, onDragEnd }) =>
  <Group node={node}>
    <NodeRect node={node} onClick={onClick} />
    <NodeTitle node={node} />
    <NodeSummary node={node} />
  </Group>

Node.propTypes = {
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDragEnd: PropTypes.func,
};

export default Node;
