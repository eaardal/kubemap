import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { toggleMode, nodeContentChanged } from './viewNode.actions';
import { toggleNodeModal, saveNode } from '../mindmap.actions';

const ViewNode = ({
  inEditMode,
  buttonText,
  node,
  onToggleMode,
  onClose,
  onSave,
  onNodeContentChanged,
}) => {
  const body = inEditMode
    ? <textarea
        cols={50}
        rows={10}
        value={node.content}
        onChange={evnt => onNodeContentChanged(evnt.target.value)}
      />
    : <Markdown source={node.content} />

  const onButtonClick = () => {
    if (inEditMode) {
      onSave(node);
    }
    onToggleMode();
  };

  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>
          {node.title}
          <br />
          <small>{node.summary}</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {body}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="primary" onClick={onButtonClick}>{buttonText}</Button>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

ViewNode.propTypes = {
  inEditMode: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
  onToggleMode: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onNodeContentChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inEditMode: state.viewNodeModal.inEditMode,
  buttonText: state.viewNodeModal.buttonText,
  node: state.viewNodeModal.node,
});

const mapDispatchToProps = dispatch => ({
  onToggleMode: () => dispatch(toggleMode()),
  onClose: () => dispatch(toggleNodeModal()),
  onSave: node => dispatch(saveNode(node)),
  onNodeContentChanged: nodeContent =>
    dispatch(nodeContentChanged(nodeContent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewNode);
