/*
 * Login Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { SET_VALUES, CHECK_CREDENTIALS, CREATE_SESSION } from './constants'

/**
 * Sends the form data to the reducer
 *
 * @param  {string} code The user's code
 * @param  {string} email The user's email
 *
 * @return {object} An action object with the form data and a type of SET_VALUES
 */
export function setValues(code, email) {
  return {
    type: SET_VALUES,
    code,
    email
  }
}

/**
 * Action to trigger the login saga to check the user's credentials
 * @return {object} An action object with the type of CHECK_CREDENTIALS
 */
export function checkCredentials() {
  return {
    type: CHECK_CREDENTIALS,
  }
}

/**
 * Populates the owner variable and saves session data to localStorage
 * @return {object} An action object with the owner attribute and the type of CREATE_SESSION
 */
export function createSession(owner){
  return {
    type: CREATE_SESSION,
    owner,
  }
}