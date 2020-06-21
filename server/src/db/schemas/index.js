require('../utils/db');

const { SchemaComposer } = require('graphql-compose');
const { UserQuery, UserMutation } = require('./User');

const schemaComposer = new SchemaComposer();
schemaComposer.Query.addFields({
  ...UserQuery,
});
schemaComposer.Mutation.addFields({
  ...UserMutation,
});

module.exports = schemaComposer.buildSchema();
