const jwt = require('jsonwebtoken');
const { User } = require('../db/models/User');

module.exports = (app) => {
  app.post('/login', async (request, response) => {
    try {
      const user = await User.findOne({
        username: request.body.username,
      }).exec();
      if (!user) {
        response.status(400).send({ message: 'Invalid credentials.' });
      } else {
        user.comparePassword(request.body.password, (error) => {
          if (error) {
            response.status(400).send('Invalid credentials.');
          } else {
            response.send(
              JSON.stringify(
                jwt.sign(user.toObject(), process.env.MONGO_DB_PASSWORD, {
                  expiresIn: '1h',
                })
              )
            );
          }
        });
      }
    } catch (e) {
      response.status(500).send(e);
    }
  });
};
