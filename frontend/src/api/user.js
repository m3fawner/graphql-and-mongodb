import Immutable from 'seamless-immutable';
import jwt from 'jsonwebtoken';
import { createContext, useReducer } from 'react';

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
});

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

export const reducer = (state, { type, payload }) => {
  switch (type) {
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
    case LOGIN_BEGIN: {
      return state.set('error', null).set('loading', true);
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
    state,
  };
};
