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
  CREATED_PRODUCT,
  LOAD_PRODUCTS, 
  MAKE_FORM_VISIBLE,
} from './constants';
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  products: [],
  isCreatePrdFormVisible: false,
  product_name: '',
  product_has_price: false,
  product_price: 0,
};

/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case LOAD_PRODUCTS:
        draft.products = action.products;
        break;
      case CREATE_PRODUCT:
        draft.product_name = action.product.name
        draft.product_price = action.product.price
        draft.product_has_price = action.product.has_price
        break;
      case CREATED_PRODUCT:
        draft.products = draft.products.concat([action.product]);
        draft.product_name = '';
        draft.product_price = '';
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