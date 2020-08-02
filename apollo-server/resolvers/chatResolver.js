const { Chat } = require('../../models/Chat');
const { Contact } = require('../../models/Contact');
const { User } = require('../../models/User');
const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');
const { pubSub, NEW_CHAT } = require('../pubsubEngine/pubSubRedis');
const { withFilter } = require('graphql-subscriptions');

exports.chatTypeDefs = gql`
  # Chat
  type Chat {
    _id: ID!
    content: String!
    sender: User!
    receiver: User!
    createdAt: String
  }

  # Query
  extend type Query {
    getChats(receiver: ID!): [Chat]!
  }
  
  # Mutation
  extend type Mutation {
    sendChatTo(content: String!, receiver: ID!): Chat!
  }

  # Subscription
  extend type Subscription {
    newChat: Chat!
  }
`;

const resolvers = {
  Query: {
    getChats: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          let chats = await Chat.find({ 
            $or: [
              {
                $and: [
                  {'sender': context.userId}, 
                  {'receiver': args.receiver}
                ]
              },
              {
                $and:[ 
                  {'receiver': context.userId}, 
                  {'sender': args.receiver}
                ]
              }
            ]
           }).populate('sender');
          /**
           * $and:[ 
              {'sender': context.userId}, 
              {'receiver': args.receiver}
            ]
           */
          return chats.map(chat => {
            return { ...chat._doc };
          })
        } catch (err) {
          throw err;
        }
      }
    }
  },
  Mutation: {
    sendChatTo: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const chat = new Chat({
            _id: new mongoose.Types.ObjectId(),
            content: args.content,
            sender: context.userId,
            receiver: args.receiver
          });
          const result = await chat.save();
          if (result) {
            const backChat = await Chat.find({ _id: chat._id })
              .populate('sender');
            pubSub.publish(NEW_CHAT, { newChat: backChat });
            return { ...result._doc };
          }
        } catch (err) {
          throw err;
        }
      }
    }
  },
  Subscription: {
    newChat: {
      subscribe: withFilter(
        () => pubSub.asyncIterator('NEW_CHAT'),
        (payload, variables, context, info) => {
          if (context.userId === payload.newChat.receiver.toString()) {
            return true;
          } else {
            return false;
          }
        },
      ),
    },
  }
}

exports.chatResolver = resolvers;