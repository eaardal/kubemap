export const getNodeById = (mindmap, nodeId) => mindmap.nodes.find(node => node.id === nodeId);

export const replaceNode = (mindmap, nodeToReplace) => {
  return mindmap.nodes.map(node => {
    if (node.id === nodeToReplace.id){
      return { ...nodeToReplace };
    }
    return node;
  });
};

export const sanitizeNode = node => {
  return {
    id: node.id,
    mindmapId: node.mindmapId,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    fill: node.fill,
    stroke: node.stroke,
    strokeWidth: node.strokeWidth,
    title: node.title,
    summary: node.summary,
    content: node.content,
    connections: node.connections,
  };
};
