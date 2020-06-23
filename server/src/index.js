const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const schema = require('./db/schemas');
const login = require('./auth/login');
const verify = require('./auth/verify');
const decode = require('./auth/decode');

const server = new ApolloServer({
  schema,
  cors: true,
  tracing: true,
  introspection: true,
  playground: true,
  path: '/graphql',
  context: (context) => {
    const auth = context.req.headers.authorization;
    if (auth) {
      try {
        const token = auth.split(' ')[1];
        verify(token);
        context.jwt = decode(token);
      } catch (e) {
        // No need, authenticated resolvers will handle null jwt token
        context.jwt = null;
      }
    }
    return context;
  },
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

login(app);
server.applyMiddleware({
  app,
  path: '/',
  cors: true,
});

app.listen({ port: process.env.PORT }, () => {
  console.log(
    `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
