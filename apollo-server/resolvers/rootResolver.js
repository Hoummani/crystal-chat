const { testsResolver } = require('./testResolver');
const { usersResolver } = require('./userResolver');

//get all resolvers
const resolvers = {
  Query: {
    ...testsResolver.Query,
    ...usersResolver.Query,
  },
  Mutation: {
    ...testsResolver.Mutation,
    ...usersResolver.Mutation,
  }
};

exports.resolvers = resolvers;