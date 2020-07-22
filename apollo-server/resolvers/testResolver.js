const { gql } = require('apollo-server');

// data
const greatings = ['Hello', 'Hi', 'Bonjour', 'By'];

// type defs
exports.testsTypeDefs = gql`
  # query
  extend type Query {
    getGreeting: [String]
  }

  # Mutation
  extend type Mutation {
    # add greeting
    addGreeting(greeting: String!): String
  }
  # subscription
  extend type Subscription {
    newGreeting: String
  }
`;

// resolvers
const resolvers = {
  Query: {
    getGreeting: () => greatings,
  },
  Mutation: {
    addGreeting: async (root, args, context) => {
      if (!context.isLoggedIn) throw new Error("Not Allowed !");
      greatings.push(args.greeting);
    }
  }
};

exports.testsResolver = resolvers;

