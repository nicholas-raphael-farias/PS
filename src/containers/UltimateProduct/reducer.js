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
  CREATE_PRODUCT, 
  SAVE_PRODUCT,
  LOAD_PRODUCTS, 
  MAKE_FORM_VISIBLE,
  CHANGE_PRODUCT_NAME,
  CHANGE_PRODUCT_HAS_PRICE,
  CHANGE_PRODUCT_PRICE,
} from './constants';
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  products: [],
  isCreatePrdFormVisible: false,
  productName: '',
  productHasPrice: false,
  productPrice: 0,
};

/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_PRODUCT_NAME:
        draft.productName = action.name;
        break;
      case CHANGE_PRODUCT_HAS_PRICE:
        draft.productHasPrice = action.hasPrice;
        draft.productPrice = 0;
        break;
      case CHANGE_PRODUCT_PRICE:
        draft.productPrice = action.price;
        break;
      case LOAD_PRODUCTS:
        draft.products = action.products;
        break;
      case SAVE_PRODUCT:
        break;
      case CREATE_PRODUCT:
        draft.products = draft.products.concat([action.product]);
        draft.productName = '';
        draft.productPrice = '';
        draft.isCreatePrdFormVisible = false;
        break;

      case MAKE_FORM_VISIBLE:
        switch (action.form) {
          case "createProductForm":            
            draft.isCreatePrdFormVisible = action.visibility;
            break;
        }
        break;
    }
  });

export default productsReducer;