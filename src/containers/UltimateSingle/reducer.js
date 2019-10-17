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
  CHANGE_FORM_STATE,
  CHANGE_MOD_NAME,
  CHANGE_MOD_TYPE,
  SAVE_MOD,
  ADD_MOD,
  CHANGE_OPT_NAME,
  CHANGE_OPT_PRICE,
  SAVE_OPT,
  ADD_OPT,
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
  mod_type: "",
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

      case CHANGE_MOD_NAME:
        draft.mod_name = action.name;
        break;
      case CHANGE_MOD_TYPE:
        draft.mod_type = action.mod_type;
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

      case CHANGE_OPT_NAME:
        draft.opt_name = action.name;
        break;
      case CHANGE_OPT_PRICE:
        draft.opt_price = action.price;
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