export default class RedisClientFake {

  constructor() {

    this.channelsSubscribedTo = [];
  }

  /**
   * Register an event handler for an event
   *
   * @param {string} event - a valid [Redis]{@link https://www.npmjs.com/package/redis} Publish/Subscribe event.
   * Supported events include:
   *  message
   * @param {function} handler - function to call when the event arrives. Function will receive the channel name
   * and the message object as parameters
   */
  on(event, handler) {

    if (event === 'message') {

      this.messageHandler = handler;
    }
  }

  /**
   * Publish a message to a channel. Any event handler registered for the 'message' event will be notified.
   *
   * @param {string} channel - the channel that the message will be published to
   * @param {string} message - the message to publish to the channel
   */
  publish(channel, message) {

    const foundChannel = this.channelsSubscribedTo.find((subChannel) => {
      return subChannel === channel;
    });

    if (foundChannel && this.messageHandler) {

      this.messageHandler(channel, message);
    }
  }

  /**
   * subscribe to be notified of messages published to the specified channel. You must be registered and listening
   * for 'message' events to be notified of any published events to this channel.
   *
   * @param {string} channel - channel to listen on
   */
  subscribe(channel) {

    this.channelsSubscribedTo.push(channel);
  }
}
