/*
 * Product Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

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

/**
 * Changes the input field of the form
 * @param  {array} products La lista de productos
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function loadProducts(products) {
  return {
    type: LOAD_PRODUCTS,
    products,
  };
}

export function createModifier(modifier) {
  return {
    type: CREATE_MODIFIER,
    modifier,
  };
}


/**
 * 
 * @param {object} product Instancia de producto
 * @return {object} An action object with a type of CREATE_PRODUCT
 */
export function createProduct(product) {
  return {
    type: CREATE_PRODUCT,
    product,
  };
}

/**
 * 
 * @param {object} product Instancia de producto
 * @return {object} An action object with a type of CREATE_PRODUCT
 */
export function addModifierToProduct(product) {
  return {
    type: ADD_MODIFIER,
    product,
  };
}

/**
 * @return {object} An action object with a type of SAVE_PRODUCT
 */
export function saveProduct() {
  return {
    type: SAVE_PRODUCT,
  };
}

/**
 * 
 * @param {string} form Nombre del form para ser actualizado  
 * @param {boolean} visibility Visibilidad del form
 * @return {object} An action object with a type of MAKE_FORM_VISIBLE
 */
export function makeFormVisible(form, visibility){
  return{
    type: MAKE_FORM_VISIBLE,
    form,
    visibility,
  };
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_PRODUCT_NAME or CHANGE_PRODUCT_PRICE
 */
export function changeProduct(property, value){
  switch (property) {
    case "name":
      return { type: CHANGE_PRODUCT_NAME, name: value};
    case "price":
      return { type: CHANGE_PRODUCT_PRICE, price: value};
    case "mod":
        return { type: CHANGE_PRODUCT_SELECT, select: value};
  }
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_MOD_NAME or CHANGE_MOD_PRICE or CHANGE_MOD_TYPE
 */
export function changeMod(property, value){
  switch (property) {
    case "name":
      return { type: CHANGE_MOD_NAME, name: value};
    case "price":
      return { type: CHANGE_MOD_PRICE, price: value};
    case "modType":
        return { type: CHANGE_MOD_TYPE, modType: value};
  }
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_CAT_NAME or CHANGE_CAT_TYPE
 */
export function changeCategory(property, value){
  switch (property) {
    case "name":
      return { type: CHANGE_CAT_NAME, name: value};
    case "type":
      return { type: CHANGE_CAT_TYPE, catType: value};
  }
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_CAT_NAME
 */
export function saveCategory(){
  return { type: SAVE_CATEGORY};
}

/**
 * 
 * @param {string} productId id of the product to be changed
 * @return {object} An action object with a type of MAKE_MOD_FORM_VISIBLE
 */
export function makeModFormVisible(productId){
  return { type: MAKE_MOD_FORM_VISIBLE, productId: productId};
}