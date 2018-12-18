import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ViewNode from './ViewNode';
import { toggleNodeModal } from '../mindmap.actions';

const ViewNodeContainer = ({
  showNodeModal,
  onToggleNodeModal,
  nodeToOpenInModal,
}) =>
  showNodeModal
    ? <ViewNode node={nodeToOpenInModal} onClose={onToggleNodeModal} />
    : null;

ViewNodeContainer.propTypes = {
  showNodeModal: PropTypes.bool.isRequired,
  onToggleNodeModal: PropTypes.func.isRequired,
  nodeToOpenInModal: PropTypes.object,
};

const mapStateToProps = state => ({
  showNodeModal: state.mindmap.showNodeModal,
  nodeToOpenInModal: state.mindmap.nodeToOpenInModal,
});

const mapDispatchToProps = dispatch => ({
  onToggleNodeModal: node => dispatch(toggleNodeModal(node)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewNodeContainer);
