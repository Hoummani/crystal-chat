const { testsResolver } = require('./testResolver');

//get all resolvers
const resolvers = {
  Query: {
    ...testsResolver.Query,
  },
  Mutation: {
    ...testsResolver.Mutation,
  }
};

exports.resolvers = resolvers;