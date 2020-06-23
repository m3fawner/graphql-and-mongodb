const { createResolver } = require('apollo-resolvers');
const {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');

const baseResolver = createResolver(
  null,
  ({ context: { res } }, __, ___, error) => {
    res.status(500);
    console.error(error);
    return new ApolloError(error);
  }
);

const isAuthenticatedResolver = baseResolver.createResolver(
  ({ context: { jwt } }) => {
    if (!jwt) {
      throw new AuthenticationError();
    }
  }
);

const userActionAuthorizedResolverCreator = (cb) =>
  isAuthenticatedResolver.createResolver(async (...args) => {
    const {
      args: { _id, record },
      context: { jwt, res },
    } = args[0];
    if (jwt._id !== _id || (record && jwt._id !== record._id)) {
      res.status(403);
      throw new ForbiddenError();
    } else {
      return await cb(...args);
    }
  });

module.exports = {
  baseResolver,
  isAuthenticatedResolver,
  userActionAuthorizedResolverCreator,
};
