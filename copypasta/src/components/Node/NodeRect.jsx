import React, { PropTypes } from 'react';
import { Rect } from 'react-konva';
import { tryFindXWithOffset, tryFindYWithOffset } from '../../utils/node.util';

const NodeRect = ({ node, onClick }) =>
  <Rect
    id={node.id}
    x={node.startX}
    y={node.startY}
    width={node.width}
    height={node.height}
    fill="#FFFFFF"
    stroke="#C4C4C4"
    strokeWidth={1}
    onClick={onClick}
    node={node}
    shadowColor="#DBDBDB"
    shadowOffset={ {x: 1, y: 1} }
  />

NodeRect.propTypes = {
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default NodeRect;
