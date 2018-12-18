import React, { PropTypes } from 'react';
import { Text } from 'react-konva';

const NodeTitle = ({ node }) =>
  <Text
    x={node.startX}
    y={node.startY}
    text={node.title}
    fontSize={20}
    fontFamily="Calibri"
  />

NodeTitle.propTypes = {
  node: PropTypes.object.isRequired,
};

export default NodeTitle;
