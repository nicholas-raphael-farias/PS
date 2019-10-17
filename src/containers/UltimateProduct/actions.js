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
  LOAD_PRODUCTS, 
  CREATE_PRODUCT,
  SAVE_PRODUCT,
  MAKE_FORM_VISIBLE,
  CHANGE_PRODUCT_NAME,
  CHANGE_PRODUCT_HAS_PRICE,
  CHANGE_PRODUCT_PRICE,
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
    case "hasPrice":
      return { type: CHANGE_PRODUCT_HAS_PRICE, hasPrice: value};
    case "price":
        return { type: CHANGE_PRODUCT_PRICE, price: value};
  }
}