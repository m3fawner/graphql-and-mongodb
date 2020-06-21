const jwt = require('jsonwebtoken');
module.exports = (token) => jwt.decode(token, process.env.MONGO_DB_PASSWORD);
