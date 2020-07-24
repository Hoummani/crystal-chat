const { User } = require('../../models/User');
const { Contact } = require('../../models/Contact');
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
  #extend type Query {}

  # Mutation
  #extend type Mutation {}

  # Subscription
  #extend type Subscription {}
`

// resolvers
const resolvers = {
  Query: {

  },
  Mutation: {

  },
  Subscription: {

  }
}

exports.contactResolver = resolvers;