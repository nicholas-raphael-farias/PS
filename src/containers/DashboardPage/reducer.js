/*
 * DashboardReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SIGN_OUT } from './constants';

export const initialState = {
  isSigningOut: false,
};

/* eslint-disable default-case, no-param-reassign */
const DashboardReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case SIGN_OUT:
        draft.isSigningOut = true;
        break;
    }
  });

export default DashboardReducer;