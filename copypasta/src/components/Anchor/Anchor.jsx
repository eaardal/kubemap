import React, { PropTypes } from 'react';
import { Rect } from 'react-konva';
import { findX, findY } from '../../utils/anchor.util';

const Anchor = ({ anchor, onClick, parentNode }) =>
  <Rect
    id={anchor.id}
    x={anchor.startX}
    y={anchor.startY}
    width={anchor.width}
    height={anchor.height}
    fill="#F8F2FA"
    stroke="#DECFE3"
    strokeWidth={1}
    onClick={() => onClick(anchor, parentNode)}
    draggable={false}
  />

Anchor.propTypes = {
  anchor: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Anchor;
