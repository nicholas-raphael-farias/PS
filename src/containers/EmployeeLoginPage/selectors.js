/**
 * LoginPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.employeeLogin || initialState;

const makeSelectCode = () =>
  createSelector(
    selectLogin,
    loginState => loginState.code,
  );

const makeSelectWasAccepted = () =>
  createSelector(
    selectLogin,
    loginState => loginState.wasAccepted,
  );

export { makeSelectCode, makeSelectWasAccepted };