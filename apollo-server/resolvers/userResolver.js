const { User } = require('../../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { gql } = require('apollo-server-express');

// type defs
exports.userTypeDefs = gql`
  # USER
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    leaved: Boolean
    isOnline: Boolean
    createdAt: String
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int
  }
  type OperationData {
    status: String!
  }

  extend type Query {
    getUsers: [User!]!
    loadUser: User!
    checkTokenIsValid: OperationData!
  }

  # Mutation
  extend type Mutation {
    # users mutations
    register(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!
    ): User!
    login(email: String!, password: String!): AuthData!
    logout: OperationData!
    resetPassword(password: String!, confirmPassword: String!): OperationData!
  }
`;

// resolvers


const resolvers = {
  Query: {
    getUsers: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const users = await User.find();
          return users.map(item => {
            return { ...item._doc };
          })
        } catch (err) {
          throw err;
        }
      }
    },
    loadUser: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const user = await User.findOne({_id: context.userId})
            .populate('job');
          if (user) {
            return { ...user._doc };
          }
        } catch (err) {
          throw err;
        }
      } else {
        throw new Error("Not allowed !");
      }
    },
    checkTokenIsValid: async (root, args, context) => {
      if (context.isLoggedIn) {
        return { status: "OK" };
      } else {
        throw new Error("Token Expired !");
      }
    }
  },
  Mutation: {
    async register (root, args, context) {
      try {
        const oldUser = await User.findOne({email: args.email});
        if (oldUser) {
          throw new Error("User Already exist !");
        }
        
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new User({
          _id : new mongoose.Types.ObjectId(),
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: hashedPassword
        });
        const result = await user.save();
        return {...result._doc};
      } catch (err) {
        throw err;
      }
    },
    login: async (root, args, context) => {

      try {
        const user = await User.findOne({email: args.email});
        if (!user) {
          throw new Error("Authentication failed !");
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Authentication failed !");
        }
        await User.updateOne({email: args.email}, {$set: {isOnline: true, lastLogIn: new Date()}});
        const token = await jwt.sign(
          {userId: user._id, email: user.email},
           process.env.JWT_KEY,
            { expiresIn: '12h' });
        return {userId: user._id, token: token, tokenExpiration: 12};
      } catch(err) {
        throw err;
      }
    },
    logout: async (root, args, context) => {
      try {
        if (context.isLoggedIn) {
          const result = await User.updateOne({_id: context.userId}, {$set: {isOnline: false}});
          if (result) {
            return { status: "OK" };
          }
        }
      } catch (err) {
        throw err;
      }
    },
    resetPassword: async (root, args, context) => {
      if (context.isLoggedIn) {
        try {
          const hashedPassword = await bcrypt.hash(args.password, 12);
          if (args.password === args.confirmPassword) {
            const result = await User.updateOne(
              { _id: context.userId },
              {$set: { password: hashedPassword }}
            );
            if (result) {
              return { status: "OK" };
            }
          } else {
            throw new Error("Confirmation of password failed !");
          }
        } catch (err) {
          throw err;
        }
      }
    }
  }
};

exports.usersResolver = resolvers;