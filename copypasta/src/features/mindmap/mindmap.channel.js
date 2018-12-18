import { Socket } from 'phoenix';
import ChannelFacade from '../../utils/channelFacade';
import { onNodeSaved, onNodeMoved, onGetMindmap } from './mindmap.actions';
import Store from '../../infrastructure/store/store';

class MindmapChannel extends ChannelFacade {
  constructor() {
    super();
    this.pubSubMap = {
      'save_node_result': this.onSaveNodeResult,
      'get_mindmap_result': this.onGetMindmapResult,
    };
    this.channelId = 'mindmap:node';
    this.keys = {
      SAVE_NODE: 'save_node',
      GET_MINDMAP: 'get_mindmap',
    };
  }

  static get instance(){
    if (!MindmapChannel._instance) {
      MindmapChannel._instance = new MindmapChannel();
    }
    return MindmapChannel._instance;
  }

  connect() {
    super.connect(this.channelId);
  }

  enableReceiveMessages() {
    super.enableReceiveMessages(this.pubSubMap);
  }

  saveNode(node) {
    super.emit(this.keys.SAVE_NODE, node);
  }

  onSaveNodeResult(payload) {
    Store.dispatch(onNodeSaved(payload.body));
  }

  getMindmap(mindmapId) {
    super.emit(this.keys.GET_MINDMAP, { mindmapId });
  }

  onGetMindmapResult(payload) {
    console.log('onGetMindmapResult', payload);
    Store.dispatch(onGetMindmap(payload.body));
  }
}

export default MindmapChannel.instance;
