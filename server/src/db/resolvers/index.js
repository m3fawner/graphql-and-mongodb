const { createResolver } = require('apollo-resolvers');
const { isInstance } = require('apollo-errors');
const {
  UnknownError,
  UnauthenticatedError,
  UnauthorizedError,
} = require('../errors');

const baseResolver = createResolver(
  null,
  ({ context: { res } }, __, ___, error) => {
    if (isInstance(error)) return error;
    res.status(500);
    console.error(error);
    return new UnknownError();
  }
);

const isAuthenticatedResolver = baseResolver.createResolver(
  ({ context: { jwt, res } }) => {
    if (!jwt) {
      res.status(401);
      throw new UnauthenticatedError();
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
      throw new UnauthorizedError();
    } else {
      return await cb(...args);
    }
  });

module.exports = {
  isAuthenticatedResolver,
  userActionAuthorizedResolverCreator,
};
