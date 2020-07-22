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
  resolvers,
  context: async({ req, connection }) => {
    // Get the user token from the headers.
    if (connection) {
      return connection.context;
    }
    if (req && req.headers) {
      const token = req.headers.authorization;
      const authToken = token.split(' ')[1];
      let decoded;
      if (authToken) {
        decoded = await jwt.verify(authToken, process.env.JWT_KEY);
        if (decoded) {
          return { userId: decoded.userId, isLoggedIn: true };
        }
      }
      return { userId: null, isLoggedIn: false };
    }
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      if (connectionParams && connectionParams.Authorization) {
        const token = connectionParams.Authorization || '';
        const authToken = token.split(' ')[1];
        let decoded;
        if (authToken && authToken !== '') {
          decoded = await jwt.verify(authToken, process.env.JWT_KEY);
          if (decoded) {
            return { userId: decoded.userId, isLoggedIn: true };
          }
        }
      }
      return { userId: null, isLoggedIn: false };
    }
  },
  introspection: true
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