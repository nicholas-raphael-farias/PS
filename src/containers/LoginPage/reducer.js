/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_CODE, CHANGE_EMAIL, CREATE_SESSION, CHECK_CREDENTIALS } from './constants';

// The initial state of the App
export const initialState = {
  code: '',
  email: '',
  wasAccepted: false,
  owner: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_CODE:
        draft.code = action.code;
        break;
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CREATE_SESSION:
        draft.wasAccepted = true;
        draft.owner = action.owner;
        break;
      case CHECK_CREDENTIALS:
        break;
    }
  });

export default loginReducer;