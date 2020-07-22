const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { typeDefs } = require('./apollo-server/schema');
const { resolvers } = require('./apollo-server/resolvers/rootResolver');

// env variables
require('dotenv').config();


// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// mongoDB
// connecting to mongodb

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log(`🤖 Connected to mongo at ${process.env.MONGO_CONNECTION}`);

});