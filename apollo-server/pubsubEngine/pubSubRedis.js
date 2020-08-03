const { RedisPubSub } = require('graphql-redis-subscriptions');
//const { PubSub } = require('apollo-server-express');

// pubsub consts
exports.NEW_CHAT = 'NEW_CHAT';
exports.NEW_FRIENDSHIP_ACCEPT = 'NEW_FRIENDSHIP_ACCEPT';
exports.NEW_JOINED_CONTACT = 'NEW_JOINED_CONTACT';

//const pubsub = new PubSub();
//exports.pubsub = pubsub;

exports.pubsub = new RedisPubSub({
  connection: {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: options => Math.max(options.attempt * 100, 3000)
  },
});