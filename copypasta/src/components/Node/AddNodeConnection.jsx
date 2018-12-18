import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Line, Group } from 'react-konva';
import { addConnectionEnd } from '../../features/mindmap/mindmap.actions';
import MousePositionRecorder from '../../utils/mousePositionRecorder.util';

class AddNodeConnection extends React.Component {
  constructor() {
    super();
    this.findPoints.bind(this);
  }

  onMouseMove(pos) {
    this.setState({
      endPos: pos,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAddingConnection && nextProps.isAddingConnection) {
      MousePositionRecorder.onMouseMove(this.onMouseMove.bind(this));
    }
  }

  findPoints() {
    if (this.state && this.state.endPos) {
      return [
        this.props.startPos.x,
        this.props.startPos.y,
        this.state.endPos.x,
        this.state.endPos.y
      ];
    }
    return [];
  }

  render() {
    const {
      isAddingConnection,
      startPos,
    } = this.props;

    const body = isAddingConnection
      ? <Line
          points={this.findPoints()}
          fill={"#D1069B"}
          stroke={"#D1069B"}
          strokeWidth={1}
        />
      : null;

    return (
      <Group>
        {body}
      </Group>
    );
  }
}

AddNodeConnection.propTypes = {
  isAddingConnection: PropTypes.bool,
  startPos: PropTypes.object,
};

const mapStateToProps = state => ({
  isAddingConnection: state.mindmap.isAddingConnection,
  startPos: state.mindmap.addConnectionStartPos,
});

export default connect(
  mapStateToProps,
  null
)(AddNodeConnection);
