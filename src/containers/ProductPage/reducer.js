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
  CREATE_MODIFIER, 
  CREATE_PRODUCT, 
  SAVE_PRODUCT,
  LOAD_PRODUCTS, 
  MAKE_FORM_VISIBLE,
  CHANGE_PRODUCT_NAME,
  CHANGE_PRODUCT_PRICE,
  CHANGE_PRODUCT_SELECT,
  CHANGE_MOD_NAME,
  CHANGE_MOD_PRICE,
  CHANGE_MOD_TYPE,
  CHANGE_CAT_NAME,
  CHANGE_CAT_TYPE,
  SAVE_CATEGORY,
  ADD_MODIFIER,
  MAKE_MOD_FORM_VISIBLE,
} from './constants';
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  products: [],
  isCreatePrdFormVisible: false,
  isCreateModFormVisible: false,
  isCreateCatFormVisible: false,
  isCreateModBtnVisible: false,
  productName: '',
  productPrice: '',
  selectedProduct: '',
  modName: '',
  modPrice: '',
  catName: '',
  catType: '',
  productToAddMod: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case CHANGE_PRODUCT_NAME:
        draft.productName = action.name;
        break;
      case CHANGE_PRODUCT_PRICE:
        draft.productPrice = action.price;
        break;
      case CHANGE_PRODUCT_SELECT:
        draft.selectedProduct = action.select;
        if(action.select === "noProduct") {
          draft.isCreateModBtnVisible = false;
          draft.isCreateCatFormVisible = false;
        } else {
          if(draft.isCreateCatFormVisible === false){
            draft.isCreateModBtnVisible = true;
          }
        }
        break

      case CHANGE_MOD_NAME:
        draft.modName = action.name;
        break;
      case CHANGE_MOD_PRICE:
        draft.modPrice = action.price;
        break;
      case CHANGE_MOD_TYPE:
        draft.modType = action.modType;
        break;

      case CHANGE_CAT_NAME:
        draft.catName = action.name;
        break;
      case CHANGE_CAT_TYPE:
        draft.catType = action.catType;
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

      case SAVE_CATEGORY:
        break;

      case CREATE_MODIFIER:
        let p = draft.products;
        const pIndex = p.findIndex(p => p.name = action.productName)
        p[pIndex].modifiers = p[pIndex].modifiers.concat([action.modifier])
        draft.products = p;
        break;

      case MAKE_FORM_VISIBLE:
        switch (action.form) {
          case "createProductForm":            
            draft.isCreatePrdFormVisible = action.visibility;
            break;
          case "createModifierForm":
            draft.isCreateModFormVisible = action.visibility;
            draft.modName = "";
            draft.modPrice = "";
            draft.modType = "";
            draft.isCreateModBtnVisible = !action.visibility;
            break;
          case "createModifierBtn":
            draft.isCreateModBtnVisible = action.visibility;
            break;
          case "createCatForm":
            draft.isCreateCatFormVisible = action.visibility;
            break;
        }
        break;

      case ADD_MODIFIER: 
        let productIndex = draft.products.findIndex(product => product._id === action.product._id);
        draft.products[productIndex] = action.product;
        draft.isCreateCatFormVisible = false;
        draft.catName = '';
        break;

      case MAKE_MOD_FORM_VISIBLE: 
        draft.productToAddMod = action.productId;
      break;
    }
  });

export default loginReducer;