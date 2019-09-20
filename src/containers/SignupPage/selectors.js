/**
 * SignupPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignup = state => state.signup || initialState;

const makeSelectName = () =>
  createSelector(
    selectSignup,
    signupState => signupState.name,
  );

const makeSelectEmail = () =>
  createSelector(
    selectSignup,
    signupState => signupState.email,
  );

const makeSelectCode = () =>
  createSelector(
    selectSignup,
    signupState => signupState.code,
  );

export { selectSignup, makeSelectName, makeSelectEmail, makeSelectCode};