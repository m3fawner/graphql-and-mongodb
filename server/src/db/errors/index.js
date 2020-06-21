const { createError } = require('apollo-errors');

const UnknownError = createError('UnknownError', {
  message:
    'An unkown error has occurred. Contact Evan, because he wrote this crap.',
});

const UnauthenticatedError = createError('UnauthenticatedError', {
  message:
    'You are attempting to access a secured service. Please login first, then try again.',
});

const UnauthorizedError = createError('UnauthorizedError', {
  message:
    "You are not authorized to take that action. Perhaps you are trying to update something that's not yours?",
});

const AuthenticationError = createError('AuthenticationError', {
  message:
    'Attempted to authenticate and ran into a problem...perhaps your token is malphormed?',
});

const SessionExpiredError = createError('SessionExpiredError', {
  message: 'Your session has expired, please login again.',
});

module.exports = {
  UnknownError,
  UnauthenticatedError,
  UnauthorizedError,
  AuthenticationError,
  SessionExpiredError,
};
