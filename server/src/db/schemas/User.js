const { User, UserTC } = require('../models/User');
const { userActionAuthorizedResolverCreator } = require('../resolvers');
UserTC.addResolver({
  name: 'updateIfPermitted',
  kind: 'mutation',
  type: UserTC.getResolver('updateById').getType(),
  args: UserTC.getResolver('updateById').getArgs(),
  resolve: userActionAuthorizedResolverCreator(async ({ args: { record } }) => {
    const user = await User.findByIdAndUpdate(record._id, record);
    return {
      record: user,
      recordId: user._id,
    };
  }),
});
UserTC.addResolver({
  name: 'deleteIfPermitted',
  kind: 'mutation',
  type: UserTC.getResolver('removeById').getType(),
  args: UserTC.getResolver('removeById').getArgs(),
  resolve: userActionAuthorizedResolverCreator(async ({ args: { _id } }) => {
    await User.findByIdAndRemove(_id);
    return {
      record: null,
      recordId: _id,
    };
  }),
});
UserTC.addResolver({
  name: 'findByIdIfPermitted',
  kind: 'query',
  type: UserTC.getResolver('findById').getType(),
  args: UserTC.getResolver('findById').getArgs(),
  resolve: userActionAuthorizedResolverCreator(
    async ({ args: { _id } }) => await User.findById(_id)
  ),
});
const UserQuery = {
  userById: UserTC.getResolver('findByIdIfPermitted'),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  userUpdateById: UserTC.getResolver('updateIfPermitted'),
  userRemoveById: UserTC.getResolver('deleteIfPermitted'),
};

module.exports = {
  UserQuery,
  UserMutation,
};
