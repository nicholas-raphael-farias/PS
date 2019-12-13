/*
 * LoginEmployees Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_CODE, CREATE_SESSION, CHECK_CREDENTIALS } from './constants';

// The initial state of the App
export const initialState = {
  code: '',
  wasAccepted: false,
  employee: {},
};

/* eslint-disable default-case, no-param-reassign */
const LoginEmployeesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CODE:
        draft.code = action.code;
        break;
      case CHECK_CREDENTIALS:
        break;
      case CREATE_SESSION:
        draft.wasAccepted = true;
        draft.owner = action.owner;
        break;
    }
  });

export default LoginEmployeesReducer;