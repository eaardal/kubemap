import LangUtil from './LangUtil';

const hasRequiredProps = node =>
  LangUtil.isDefined(node) &&
  LangUtil.hasProp(node, 'layout') &&
  LangUtil.hasProp(node, 'layout.x') &&
  LangUtil.hasProp(node, 'layout.y') &&
  LangUtil.hasProp(node, 'layout.height') &&
  LangUtil.hasProp(node, 'layout.width');

export const NodeConnectionPoint = {
  topLeft: 'topLeft',
  centerTop: 'centerTop',
  topRight: 'topRight',
  centerRight: 'centerRight',
  bottomRight: 'bottomRight',
  bottomCenter: 'bottomCenter',
  bottomLeft: 'bottomLeft',
  centerLeft: 'centerLeft',
};

const connectionPointExists = cp => {
  const allCps = Object.keys(NodeConnectionPoint).map(
    key => NodeConnectionPoint[key]
  );
  return allCps.includes(cp);
};

class NodeConnectorUtil {
  static createConnectorAtTopLeft(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    // top left is default, just use x and y as is. Destructing to be explicit about it.
    const { x, y } = node.layout;

    return { x, y };
  }

  static createConnectorAtCenterTop(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }
    console.log('node', node);
    const x = node.layout.x + node.layout.width / 2;
    const { y } = node.layout;

    return { x, y };
  }

  static createConnectorAtTopRight(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const x = node.layout.x + node.layout.width;
    const { y } = node.layout;

    return { x, y };
  }

  static createConnectorAtCenterRight(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const x = node.layout.x + node.layout.width;
    const y = node.layout.y + node.layout.height / 2;

    return { x, y };
  }

  static createConnectorAtBottomRight(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const x = node.layout.x + node.layout.width;
    const y = node.layout.y + node.layout.height;

    return { x, y };
  }

  static createConnectorAtBottomCenter(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const x = node.layout.x + node.layout.width / 2;
    const y = node.layout.y + node.layout.height;

    return { x, y };
  }

  static createConnectorAtBottomLeft(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const { x } = node.layout;
    const y = node.layout.y + node.layout.height;

    return { x, y };
  }

  static createConnectorAtCenterLeft(node) {
    if (!hasRequiredProps(node)) {
      throw new Error(
        'node is invalid. Must contain props "x", "y", "width", "height"'
      );
    }

    const { x } = node.layout;
    const y = node.layout.y + node.layout.height / 2;

    return { x, y };
  }

  static createConnectorForNode = (node, connectionPoint) => {
    switch (connectionPoint) {
      case NodeConnectionPoint.topLeft:
        return NodeConnectorUtil.createConnectorAtTopLeft(node);
      case NodeConnectionPoint.centerTop:
        return NodeConnectorUtil.createConnectorAtCenterTop(node);
      case NodeConnectionPoint.topRight:
        return NodeConnectorUtil.createConnectorAtTopRight(node);
      case NodeConnectionPoint.centerRight:
        return NodeConnectorUtil.createConnectorAtCenterRight(node);
      case NodeConnectionPoint.bottomRight:
        return NodeConnectorUtil.createConnectorAtBottomRight(node);
      case NodeConnectionPoint.bottomCenter:
        return NodeConnectorUtil.createConnectorAtBottomCenter(node);
      case NodeConnectionPoint.bottomLeft:
        return NodeConnectorUtil.createConnectorAtBottomLeft(node);
      case NodeConnectionPoint.centerLeft:
        return NodeConnectorUtil.createConnectorAtCenterLeft(node);
      default:
        return NodeConnectorUtil.createConnectorAtTopLeft(node);
    }
  };

  static connectNodesAt(
    nodeStart,
    nodeEnd,
    connectionPointStart,
    connectionPointEnd
  ) {
    if (!hasRequiredProps(nodeStart)) {
      throw new Error(
        'nodeStart is invalid. Must contain props "x", "y", "width", "height"'
      );
    }
    if (!hasRequiredProps(nodeEnd)) {
      throw new Error(
        'nodeEnd is invalid. Must contain props "x", "y", "width", "height"'
      );
    }
    if (!connectionPointExists(connectionPointStart)) {
      throw new Error(
        'connectionPointStart is invalid. Must be one of NodeConnectionPoint values'
      );
    }

    if (!connectionPointExists(connectionPointEnd)) {
      throw new Error(
        'connectionPointEnd is invalid. Must be one of NodeConnectionPoint values'
      );
    }

    const connectorStartPoint = NodeConnectorUtil.createConnectorForNode(
      nodeStart,
      connectionPointStart
    );
    const connectorEndPoint = NodeConnectorUtil.createConnectorForNode(
      nodeEnd,
      connectionPointEnd
    );

    return {
      layout: {
        kind: 'connector',
        startX: connectorStartPoint.x,
        startY: connectorStartPoint.y,
        endX: connectorEndPoint.x,
        endY: connectorEndPoint.y,
      },
    };
  }
}

export default NodeConnectorUtil;
