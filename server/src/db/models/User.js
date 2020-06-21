const { Schema, model } = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseBcrypt = require('mongoose-bcrypt');
const bcrypt = require('bcrypt');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    meta: {
      name: {
        first: {
          type: String,
          trim: true,
          required: true,
        },
        last: {
          type: String,
          trim: true,
          required: true,
        },
      },
    },
  },
  {
    collection: 'users',
  }
);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseBcrypt);
UserSchema.index({ createdAt: 1, updatedAt: 1 });
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, res) {
    if (err) {
      cb(err);
    }
    if (res) {
      cb(null, {});
    } else {
      cb('InvalidCredentials');
    }
  });
};

const User = model('User', UserSchema);
module.exports = {
  User,
  UserTC: composeWithMongoose(User),
};
