import Immutable from 'seamless-immutable';
import jwt from 'jsonwebtoken';
import { createContext, useReducer } from 'react';
import { gql } from '@apollo/client';
import client, { ERROR_MAP, ERROR_NAME_MAP } from './apollo';

const token = sessionStorage.getItem('authToken');
let isValid;
let isExpired = false;
try {
  isValid = token && jwt.verify(token, PUBLIC_KEY);
} catch (e) {
  isExpired = e.name === 'TokenExpiredError';
  isValid = false;
}
const INITIAL_STATE = Immutable({
  isLoggedIn: !!isValid,
  isExpired,
  decoded: isValid ? jwt.decode(token) : null,
  registeredThisSession: false,
  fieldErrors: null,
});

const LOG_OUT = 'user/LOG_OUT';

const LOGIN_BEGIN = 'user/LOGIN_BEGIN';
const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const login = (dispatch) => async (credentials) => {
  dispatch({ type: LOGIN_BEGIN });
  try {
    await fetch(`${API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (response.status === 200) return body;
        return Promise.reject(body);
      })
      .then((response) => {
        sessionStorage.setItem('authToken', response);
        dispatch({ type: LOGIN_SUCCESS, payload: jwt.decode(response) });
      });
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e });
  }
};
const registerMutation = gql`
  mutation CreateUser($record: CreateOneUserInput!) {
    userCreateOne(record: $record) {
      _id: recordId
    }
  }
`;
const REGISTER_BEGIN = 'user/REGISTER_BEGIN';
const REGISTER_ERROR = 'user/REGISTER_ERROR';
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
const registerUser = (dispatch) => async (user) => {
  try {
    dispatch({ type: REGISTER_BEGIN });
    await client.mutate({
      mutation: registerMutation,
      variables: {
        record: user,
      },
    });
    dispatch({ type: REGISTER_SUCCESS });
    await login(dispatch)({ username: user.username, password: user.password });
  } catch (e) {
    dispatch({ type: REGISTER_ERROR, payload: e });
  }
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOG_OUT: {
      return Immutable({
        isLoggedIn: false,
        isExpired: false,
        decoded: null,
        loading: false,
      });
    }
    case LOGIN_SUCCESS: {
      return state
        .set('decoded', payload)
        .set('loading', false)
        .set('isLoggedIn', true)
        .set('isExpired', false);
    }
    case LOGIN_FAILURE: {
      return state.set('error', payload.message).set('loading', false);
    }
    case REGISTER_BEGIN:
    case LOGIN_BEGIN: {
      return state.set('error', null).set('loading', true);
    }
    case REGISTER_SUCCESS: {
      return state.set('registeredThisSession', true).set('loading', false);
    }
    case REGISTER_ERROR: {
      return state
        .set('loading', false)
        .set(
          'fieldErrors',
          payload.message === ERROR_NAME_MAP.USER_DATA_TAKEN
            ? {
              email:
                'If this is your email, please attempt to recover username/password.',
              username: 'Username may have already been taken',
            }
            : null,
        )
        .set('error', ERROR_MAP[payload.message]);
    }
    default:
      return state;
  }
};
export const UserContext = createContext(INITIAL_STATE);
export default (initial = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initial);
  return {
    login: login(dispatch),
    logOut: () => {
      sessionStorage.setItem('authToken', '');
      dispatch({ type: LOG_OUT });
    },
    registerUser: registerUser(dispatch),
    ...state,
  };
};
