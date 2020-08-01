const { Chat } = require('../../models/Chat');
const { Contact } = require('../../models/Contact');
const { User } = require('../../models/User');
const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');

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
  #extend type Subscription {}
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
            return { ...result._doc };
          }
        } catch (err) {
          throw err;
        }
      }
    }
  },
  Subscription: {

  }
}

exports.chatResolver = resolvers;