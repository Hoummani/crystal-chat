const { RedisPubSub } = require('graphql-redis-subscriptions');
//const { PubSub } = require('apollo-server-express');

// pubsub consts
exports.NEW_CHAT = 'NEW_CHAT';


//const pubsub = new PubSub();
//exports.pubsub = pubsub;

exports.pubsub = new RedisPubSub({
  connection: {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: options => Math.max(options.attempt * 100, 3000)
  },
});