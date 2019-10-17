/*
 * SignupReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_NAME, CHANGE_EMAIL, CHANGE_CODE, CREATE_OWNER, UPDATE_OWNER } from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  email: '',
  code: '',
  wasCreated: false,
};

/* eslint-disable default-case, no-param-reassign */
const signupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAME:
        draft.name = action.name;
        break;
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_CODE:
        draft.code = action.code;
        break;
      case CREATE_OWNER:
        console.log("reducer")
        break;
      case UPDATE_OWNER:
        draft.owner = action.owner;
        draft.name = '';
        draft.email = '';
        draft.code = '';
        draft.wasCreated = true;
        break;
    }
  });

export default signupReducer;