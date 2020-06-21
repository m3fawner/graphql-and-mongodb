const jwt = require('jsonwebtoken');
module.exports = (token) => jwt.verify(token, process.env.MONGO_DB_PASSWORD);
