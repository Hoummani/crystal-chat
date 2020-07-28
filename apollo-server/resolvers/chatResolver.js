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
    contact: Contact!
    createdAt: String
  }

  # Query
  extend type Query {
    getChats(contactId: ID!): [Chat]!
  }
  
  # Mutation
  extend type Mutation {
    sendChatTo(ContactId: ID!, sender: ID!, receiver: ID!): Chat!
  }

  # Subscription
  #extend type Subscription {}
`;

const resolvers = {
  Query: {
    getChats: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const chats = await Chat.find({ contact: args.contactId });
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
            contact: args.contactId,
            receiver: args.receiver
          });
          const result = await chat.save();
          if (result) {
            await Contact.updateOne(
              { _id: args.contactId },
              {$push: { chats: chat._id }}
            );
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