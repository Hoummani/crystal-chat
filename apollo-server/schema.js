const { gql } = require('apollo-server-express');
const { testsTypeDefs } = require('./resolvers/testResolver');
const { userTypeDefs } = require('./resolvers/userResolver');

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
`;

exports.typeDefs = typeDefs;