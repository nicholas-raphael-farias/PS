/**
 * LoginPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginE = state => state.loginEmployees || initialState;

const makeSelectCode = () =>
  createSelector(
    selectLoginE,
    loginState => loginState.code,
  );

const makeSelectWasAccepted = () =>
  createSelector(
    selectLoginE,
    loginState => loginState.wasAccepted,
  );

export { makeSelectCode, makeSelectWasAccepted };