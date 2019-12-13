

import { CHANGE_CODE, CHECK_CREDENTIALS, CREATE_SESSION } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} code The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeCode(code) {
  return {
    type: CHANGE_CODE,
    code,
  };
}

export function checkCredentials(code) {
  return {
    type: CHECK_CREDENTIALS,
    code,
  };
}

export function createSession(employee){
  return {
    type: CREATE_SESSION,
    employee,
  };
}