// const { ApolloServer } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { typeDefs } = require('./apollo-server/schema');
const { resolvers } = require('./apollo-server/resolvers/rootResolver');
const uploadProfileAvatar = require('./services/uploadProfileAvatar');

// env variables
require('dotenv').config();

// express staffs
const app = express();
app.use(cors());

// static files
app.use('/uploads', express.static('uploads'));
app.use('/upload/profileAvatar', uploadProfileAvatar);


// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req, connection }) => {
    // Get the user token from the headers.
    if (connection) {
      return connection.context;
    }
    if (req && req.headers && req.headers.authorization) {
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
            //console.log(decoded);
            return { userId: decoded.userId, isLoggedIn: true };
          }
        }
      }
      return { userId: null, isLoggedIn: false };
    }
  },
  introspection: true
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
// The `listen` method launches a web server.
/*
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/
httpServer.listen({ port: process.env.PORT }, () => {
  console.log(`🚀  Server is ready at : http://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`🚀  Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`)
})

// mongoDB
// connecting to mongodb

mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log(`🤖 Connected to mongo at ${process.env.MONGO_CONNECTION}`);

});