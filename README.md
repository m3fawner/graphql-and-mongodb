### GraphQL & MongoDB exploration

This project is Evan's exploration into writing an Apollo Server based
graphQL & Mongo DB integration.

### Installation

#### Prerequisites

- Node v12 & npm 6.x.x

#### Installation

Set up environment variables for:

- MONGO_DB_USER
- MONGO_DB_PASSWORD

**Note:** The MONGO_DB_PASSWORD will act as the JWT private signature for
the tokens generated from this service. This means tokens are not valid
across multiple service instances unless authenticated with the same
credentials.

Within the project directory: `npm i`

#### Start

`npm start`

### Usage

`npm start` will spin up the database connection to the MongoDB cluster
running in the cloud. This will be served on the port defined in `.env`
(currently set to 4000).

GraphQL playground will be hosted at
[http://localhost:4000/graphql](http://localhost:4000/graphql).

Current operations are all User based, including creating and updating user
entries. These operations have access controls in which modifications/reads
to a created user can only be done by said user.

The front end code runs on [http://localhost:8080](http://localhost:8080).

### Authenticating

Receiving a jwt token from the service is done by making a post request to
`http://localhost:4000/login` with the appropriate `username` and `password`
combination.

The jwt is encoded and signed to work within the service that is running. To
utilize the token, add it to the `Authorization` header as `Bearer {token}`.
