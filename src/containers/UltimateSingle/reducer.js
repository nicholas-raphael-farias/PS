/*
 * ProductReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  LOAD_PRODUCT,
  SET_MOD_VALUES,
  SAVE_MOD,
  ADD_MOD,
  SET_OPT_VALUES,
  SAVE_OPT,
  ADD_OPT,
  CHANGE_MOD_CHOICE,
  CHANGE_FORM_STATE,
} from './constants';
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  product: {
    name: "",
    modifiers:[],
  },
  is_vsbl_crt_mod: false,
  is_vsbl_crt_opt: false,
  mod_name: "",
  is_mod_optional: false,
  is_mod_multiple_choice: false,
  mod_to_add_opt: "",
  opt_name:"",
  opt_price:"",
};

/* eslint-disable default-case, no-param-reassign */
const ultimateSReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case LOAD_PRODUCT:
        draft.product = action.product;
        break;

      case SET_MOD_VALUES:
        console.log('action')
        console.log(action)
        draft.mod_name = action.modifier.name
        draft.is_mod_optional = action.modifier.is_optional
        draft.is_mod_multiple_choice = action.modifier.is_multiple_choice
        break;

      case SAVE_MOD:
        break;
      case ADD_MOD:
        draft.product= action.product;
        draft.is_vsbl_crt_mod = false;
        draft.mod_name = "";
        draft.mod_type = "";
        break;

      case CHANGE_FORM_STATE:
        switch (action.form) {
          case "crt_mod":            
            draft.is_vsbl_crt_mod = action.new_state;
            break;
          case "crt_opt":
            draft.is_vsbl_crt_opt = action.new_state;
            draft.mod_to_add_opt = action.opts;
            break;
        }
        break;
      case SET_OPT_VALUES:
        draft.opt_name = action.option.name
        draft.opt_price = action.option.price
        break; 
      case SAVE_OPT:
        break;
      case ADD_OPT:
        draft.product= action.product;
        draft.is_vsbl_crt_opt = false;
        draft.opt_name = "";
        draft.opt_price = "";
        break;
  }
  });

export default ultimateSReducer;