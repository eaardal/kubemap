export const tryFindXWithOffset = node => {
  if (node.xOffset) {
    return node.x + node.xOffset;
  }
  return node.x;
};

export const tryFindYWithOffset = node => {
  if (node.yOffset) {
    return node.y + node.yOffset;
  }
  return node.y;
}

export const applyOffset = node => {
  return {
    ...node,
    x: node.x + node.xOffset,
    y: node.y + node.yOffset,
  };
};

export const createConnection = (startAnchor, endAnchor) => ({
  startNodeId: startAnchor.parentId,
  startAnchorId: startAnchor.id,
  endNodeId: endAnchor.parentId,
  endAnchorId: endAnchor.id,
});

export const add = (nr) => nr + nr;
