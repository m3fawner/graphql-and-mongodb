import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
});

export const ERROR_NAME_MAP = {
  USER_DATA_TAKEN: 'UserInputError.UserDataTaken',
};
export const ERROR_MAP = {
  'UserInputError.UserDataTaken':
    'Either the username or email entered have already been taken.',
};
const convertGraphQLError = (error) => new Error(error.networkError.result.errors[0].message.split(': ').join('.'));
const graphQLActionCreator = (action) => async (...args) => {
  try {
    const response = await client[action](...args);
    if (response?.errors?.length > 0) {
      throw new Error(response.errors[0].message);
    } else {
      return response.data;
    }
  } catch (e) {
    throw convertGraphQLError(e);
  }
};
export default {
  ...client,
  mutate: graphQLActionCreator('mutate'),
  query: graphQLActionCreator('query'),
};
