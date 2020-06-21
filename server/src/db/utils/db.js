const mongoose = require('mongoose');

mongoose.Promsie = global.Promise;

const connection = mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-edutp.mongodb.net/users?retryWrites=true&w=majority`,
  {
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.set('useCreateIndex', true);

connection
  .then((db) => db)
  .catch((err) => {
    console.log(err);
  });
module.exports = connection;
