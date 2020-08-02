const { RedisPubSub } = require('graphql-redis-subscriptions');

// pubsub consts
exports.NEW_CHAT = 'NEW_CHAT';

exports.pubSub = new RedisPubSub({
  connection: {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: options => Math.max(options.attempt * 100, 3000)
  },
});