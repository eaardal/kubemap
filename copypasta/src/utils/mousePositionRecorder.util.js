class MousePositionRecorder {
  static initialize() {
    MousePositionRecorder.positions = [];
    MousePositionRecorder.recordingEnabled = false;
    MousePositionRecorder.onMouseMoveCallbacks = [];
  }

  static record(e) {
    if (MousePositionRecorder.recordingEnabled) {
      let mouseX, mouseY;

      if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
      } else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
      } else {
        return;
      }

      const pos = {
        x: mouseX,
        y: mouseY,
      };

      MousePositionRecorder.positions.push(pos);
      MousePositionRecorder.onMouseMoveCallbacks.forEach(cb => cb(pos));
    }
  }

  static getLastPosition() {
    if (MousePositionRecorder.positions.length > 0) {
      return MousePositionRecorder.positions[MousePositionRecorder.length - 1];
    }
    return null;
  }

  static enableRecording() {
    MousePositionRecorder.recordingEnabled = true;
  }

  static disableRecording() {
    MousePositionRecorder.recordingEnabled = false;
  }

  static onMouseMove(callback) {
    MousePositionRecorder.onMouseMoveCallbacks.push(callback);
  }

  static attachToMouseMove() {
    const canvasList = document.getElementsByTagName('canvas');
    if (canvasList.length > 0) {
      const canvas = canvasList[0];
      canvas.addEventListener('mousemove', MousePositionRecorder.record);
    }
  }
}

export default MousePositionRecorder;
