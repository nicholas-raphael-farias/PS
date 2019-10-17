/*
 * Login Actions
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

import { LOAD_PRODUCTS, CHOOSE_PRODUCT, DRAG_AND_DROP, ADD_AND_DROP, UNASSIGN_MODIFIER, ADD_FIRST_ITEM, SAVE_MODIFIERS, UPDATE_PRODUCT } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {arra} products product list
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS
 */
export function loadProducts(products) {
  return {
    type: LOAD_PRODUCTS,
    products,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} productId id of the product to be selected
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS
 */
export function chooseProduct(productId) {
  return {
    type: CHOOSE_PRODUCT,
    productId,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} dragOrder order of the Drag element that is being dragged
 * @param  {string} hoverOrder order of the Drag element that the user is replacing
 * @return {object} An action object with a type of DRAG_AND_DROP
 */
export function dragAndDrop(dragOrder, hoverOrder) {
  return {
    type: DRAG_AND_DROP,
    dragOrder,
    hoverOrder,
  };
}

/**
 * Changes the input field of the form
 * @param  {string} dragName name of the Drag element being dragged
 * @param  {string} hoverOrder order of the Drag element that the user is replacing
 * @return {object} An action object with a type of ADD_AND_DROP
 */
export function addAndDrop(dragName, hoverOrder) {
  return {
    type: ADD_AND_DROP,
    dragName,
    hoverOrder,
  };
}

/**
 * Changes the input field of the form
 * @param  {object} item item to be removed
 * @return {object} An action object with a type of REMOVE_ITEM
 */
export function unassignModifier(mod_name, mod_order) {
  return {
    type: UNASSIGN_MODIFIER,
    mod_name,
    mod_order,
  };
}

/**
 * Changes the input field of the form
 * @param  {object} item first item to be assigned
 * @return {object} An action object with a type of ADD_FIRST_ITEM
 */
export function addFirstItem(item) {
  return {
    type: ADD_FIRST_ITEM,
    item,
  };
}

/**
 * Changes the input field of the form
 * @return {object} An action object with a type of SAVE_MODIFIERS
 */
export function saveModifiers() {
  return {
    type: SAVE_MODIFIERS,
  };
}

/**
 * Changes the input field of the form
 * @param  {object} producto para ser actualizado
 * @return {object} An action object with a type of SAVE_MODIFIERS
 */
export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product: product,
  };
}