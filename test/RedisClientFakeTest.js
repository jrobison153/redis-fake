/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import RedisClient from '../src/RedisClientFake';

describe('Redis Client Fake Test', () => {

  let redisClient;

  describe('when constructed', () => {

    const options = {
      a: 'foo',
      b: () => {},
    };

    beforeEach(() => {

      redisClient = new RedisClient(1234, 'some host', options);
    });

    it('spys the provided port', () => {

      expect(redisClient.port).to.equal(1234);
    });

    it('spys the provided host', () => {

      expect(redisClient.host).to.equal('some host');
    });

    it('spys the provided options', () => {

      expect(redisClient.options).to.deep.equal(options);
    });
  });

  describe('when subscribed to a topic', () => {

    beforeEach(() => {

      redisClient = new RedisClient();
    });

    describe('and an event handler is registered for messages', () => {

      let messageHandled;
      let handledChannel;
      let handledMessage;

      beforeEach(() => {

        messageHandled = false;

        redisClient.subscribe('FOO_TOPIC');

        redisClient.on('message', (channel, message) => {

          handledChannel = channel;
          handledMessage = message;
          messageHandled = true;
        });

        redisClient.publish('FOO_TOPIC', 'here is some data');
      });

      it('then the messages are handled', () => {

        expect(messageHandled).to.be.true;
      });

      it('then the channel is provided to the handler function', () => {

        expect(handledChannel).to.equal('FOO_TOPIC');
      });

      it('then the message is provided to the handler function', () => {

        expect(handledMessage).to.equal('here is some data');
      });
    });

    describe('and an event handler is not registered for event other than messages', () => {

      let messageHandled;

      beforeEach(() => {

        messageHandled = false;

        redisClient.subscribe('FOO_TOPIC');

        redisClient.on('subscribe', () => {

          messageHandled = true;
        });

        redisClient.publish('FOO_TOPIC', 'here is some data');
      });

      it('then the messages are not handled', () => {

        expect(messageHandled).to.be.false;
      });
    });
  });

  describe('when not subscribed to a topic', () => {

    beforeEach(() => {

      redisClient = new RedisClient();
    });

    describe('and an event handler is registered for messages', () => {

      let messageHandled;

      beforeEach(() => {

        messageHandled = false;

        redisClient.on('message', () => {

          messageHandled = true;
        });

        redisClient.publish('FOO_TOPIC', 'here is some data');
      });

      it('then the messages not are handled', () => {

        expect(messageHandled).to.be.false;
      });
    });
  });
});
