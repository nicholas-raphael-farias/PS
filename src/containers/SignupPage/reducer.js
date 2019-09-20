/*
 * SignupReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_NAME, CHANGE_EMAIL, CHANGE_CODE } from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  email: '',
  code: '',
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
    }
  });

export default signupReducer;