import MindmapChannel from '../features/mindmap/mindmap.channel';

const enableSockets = () => {
  MindmapChannel.connect();
  MindmapChannel.enableReceiveMessages();
};

export default enableSockets;
