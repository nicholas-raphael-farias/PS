/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { SET_VALUES, CREATE_SESSION, CHECK_CREDENTIALS } from './constants'

// The initial state of LoginPage
export const initialState = {
  code: '',
  email: '',
  was_accepted: false,
  owner: {},
}

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_VALUES:
        draft.code = action.code
        draft.email = action.email
        break
      case CREATE_SESSION:
        draft.was_accepted = true
        draft.owner = action.owner
        break
      case CHECK_CREDENTIALS:
        break
    }
  });

export default loginReducer