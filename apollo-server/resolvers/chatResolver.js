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
  #extend type Query {}
  
  # Mutation
  #extend type Mutation {}

  # Subscription
  #extend type Subscription {}
`;

const resolvers = {
  Query: {

  },
  Mutation: {

  },
  Subscription: {

  }
}

exports.chatResolver = resolvers;