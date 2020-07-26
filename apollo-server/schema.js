const { gql } = require('apollo-server-express');
const { testsTypeDefs } = require('./resolvers/testResolver');
const { userTypeDefs } = require('./resolvers/userResolver');
const { contactTypeDefs } = require('./resolvers/contactResolver');
const { chatTypeDefs } = require('./resolvers/chatResolver');

const typeDefs = gql`

  # Query
  type Query {
    _empty: String
  }

  # Mutation
  type Mutation {
    _empty: String
  }
  # subscription
  type Subscription {
    _empty: String
  }
  ${testsTypeDefs}
  ${userTypeDefs}
  ${contactTypeDefs}
  ${chatTypeDefs}
`;

exports.typeDefs = typeDefs;