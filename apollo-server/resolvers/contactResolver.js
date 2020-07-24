const { User } = require('../../models/User');
const { Contact } = require('../../models/Contact');
const mongoose = require('mongoose');
const { gql } = require('apollo-server-express');

// typeDefs
exports.contactTypeDefs = gql`

  # Contact
  type Contact {
    _id: ID!
    user: User!
    friend: User!
    chats: [Chat]
    createdAt: String
  }

  # Query
  extend type Query {
    getMyContacts: [Contact!]!
  }

  # Mutation
  extend type Mutation {
    addContact(friendId: ID!): Contact!
  }

  # Subscription
  #extend type Subscription {}
`

// resolvers
const resolvers = {
  Query: {
    getMyContacts: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const contacts = await Contact.find({ user: context.userId })
            .populate('friend');
          return contacts.map(item => {
            return { ...item._doc };
          })
        } catch (err) {
          throw err;
        }
      }
    }
  },
  Mutation: {
    addContact: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            user: context.userId,
            friend: args.friendId,
            friendShip: false
          });
          const result = await contact.save();
          if (result) {
            const backContact = await Contact.findOne({_id: result._id})
              .populate('friend');
            return { ...backContact._doc };
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

exports.contactResolver = resolvers;