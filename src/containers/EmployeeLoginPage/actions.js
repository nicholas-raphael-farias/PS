import { CHANGE_CODE, CHANGE_EMAIL, CHECK_CREDENTIALS, CREATE_SESSION } from './constants';

/**
 * Changes the input field of the form
 * @param  {string} code The new code
 * @return {object} An action object with a type of CHANGE_CODE
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