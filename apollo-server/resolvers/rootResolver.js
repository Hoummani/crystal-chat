const { testsResolver } = require('./testResolver');
const { usersResolver } = require('./userResolver');
const { contactResolver } = require('./contactResolver');
const { chatResolver } = require('./chatResolver');

//get all resolvers
const resolvers = {
  Query: {
    ...testsResolver.Query,
    ...usersResolver.Query,
    ...contactResolver.Query,
    ...chatResolver.Query
  },
  Mutation: {
    ...testsResolver.Mutation,
    ...usersResolver.Mutation,
    ...contactResolver.Mutation,
    ...chatResolver.Mutation
  },
  Subscription: {
    ...contactResolver.Subscription,
    ...chatResolver.Subscription
  }
};

exports.resolvers = resolvers;