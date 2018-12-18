import React, { PropTypes } from 'react';
import { Text } from 'react-konva';

const NodeSummary = ({ node }) =>
  <Text
    x={node.startX}
    y={node.startY}
    text={node.summary}
    fontSize={12}
    fontFamily="Calibri"
    offsetY={-20}
  />

NodeSummary.propTypes = {
  node: PropTypes.object.isRequired,
};

export default NodeSummary;
