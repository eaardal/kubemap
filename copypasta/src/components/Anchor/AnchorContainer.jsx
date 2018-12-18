import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';
import Anchor from './Anchor';
import { nodeAnchorClick } from '../../features/mindmap/mindmap.actions';

const AnchorContainer = ({
  anchors,
  onAnchorClick,
  parentNode,
}) => {
  return (<Group>
    {anchors.map(anchor =>
      <Anchor
        key={`anchor_${anchor.id}`}
        anchor={anchor}
        parentNode={parentNode}
        onClick={onAnchorClick}
      />
    )}
  </Group>);
}


AnchorContainer.propTypes = {
  parentNode: PropTypes.object.isRequired,
  anchors: PropTypes.array.isRequired,
  onAnchorClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAnchorClick: (anchor, parentNode) => dispatch(nodeAnchorClick(anchor, parentNode)),
});

export default connect(
  null,
  mapDispatchToProps
)(AnchorContainer);
