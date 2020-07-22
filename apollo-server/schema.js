const { gql } = require('apollo-server');
const { testsTypeDefs } = require('./resolvers/testResolver');

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
`;

exports.typeDefs = typeDefs;