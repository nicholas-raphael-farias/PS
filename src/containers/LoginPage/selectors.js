/**
 * LoginPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectCode = () =>
  createSelector(
    selectLogin,
    loginState => loginState.code,
  );

const makeSelectEmail = () =>
  createSelector(
    selectLogin,
    loginState => loginState.email,
  );

const makeSelectWasAccepted = () =>
  createSelector(
    selectLogin,
    loginState => loginState.wasAccepted,
  );

export { makeSelectCode, makeSelectEmail, makeSelectWasAccepted };