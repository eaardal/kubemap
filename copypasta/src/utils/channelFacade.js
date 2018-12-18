import { Socket } from 'phoenix';

class ChannelFacade {
  constructor() {
    this.socket = new Socket('/socket', { params: { token: window.userToken }});
  }

  connect(channelName) {
    this.socket.connect();
    this.channel = this.socket.channel(channelName, { });
    this.channel.join()
      .receive('ok', response => {
        console.log(`Joined channel ${channelName} successfully`, response)
      })
      .receive('error', response => {
        console.log(`Unable to join ${channelName}`, response)
      });
  }

  emit(message, payload) {
    this.channel.push(message, { body: payload });
  }

  enableReceiveMessage(message, onReceive) {
    this.channel.on(message, onReceive);
  }

  enableReceiveMessages(pubSubMap) {
    for (const messageKey in pubSubMap) {
      if (pubSubMap.hasOwnProperty(messageKey)) {
        const messageHandler = pubSubMap[messageKey];
        this.channel.on(messageKey, messageHandler);
      }
    }
  }
}

export default ChannelFacade;
