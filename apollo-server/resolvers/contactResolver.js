const { User } = require('../../models/User');
const { Contact } = require('../../models/Contact');
const { Notification } = require('../../models/Notification');
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
  type Notification {
    _id: ID!
    sender: User!
    receiver: User!
    content: String!
    contactAbout: Contact!
    visited: Boolean
    createdAt: String
  }
  type SuccessOperation{
    status: String!
  }

  # Query
  extend type Query {
    getMyContacts: [Contact!]!
    getMyNotifications: [Notification!]!
  }

  # Mutation
  extend type Mutation {
    joinUser(friendId: ID!): Contact!
    acceptFrienship(contactId: ID!, notifId: ID!): SuccessOperation!
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
          //const contacts = await Contact.find({ user: context.userId, friendShip: true })
          const contacts = await Contact.find(
            {$or:[ 
              {'user':context.userId}, 
              {'friend':context.userId}
            ], 
            friendShip: true
            })
            .populate('user')
            .populate('friend');
          return contacts.map(item => {
            return { ...item._doc };
          })
        } catch (err) {
          throw err;
        }
      }
    },
    getMyNotifications: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const notifs = await Notification.find({ receiver: context.userId })
            .populate('sender');
          return notifs.map(notif => {
            return { ...notif._doc };
          })
        } catch (err) {
          throw err;
        }
      }
    }
  },
  Mutation: {
    joinUser: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const anyContact = await Contact.findOne({ user: context.userId, friend: args.friendId })
          if (anyContact) {
            throw new Error("Already Joined");
          }
          const contact = new Contact({
            _id: new mongoose.Types.ObjectId(),
            user: context.userId,
            friend: args.friendId,
            friendShip: false
          });
          const result = await contact.save();
          if (result) {
            const notif = new Notification({
              _id: new mongoose.Types.ObjectId(),
              sender: context.userId,
              receiver: args.friendId,
              contactAbout: result._id,
              content: "Asking you to join his contact list"
            });
            await notif.save();
            const backContact = await Contact.findOne({_id: result._id})
              .populate('friend');
            return { ...backContact._doc };
          }
        } catch (err) {
          throw err;
        }
      }
    },
    acceptFrienship: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const resultUp = await Contact.updateOne(
            { _id: args.contactId },
            {$set: { friendShip: true }}
          );
          await Notification.updateOne(
            { _id: args.notifId },
            { $set: {visited: true} }
          );
          if (resultUp) {
            return { status: "OK" };
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