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

 /**
 * Changes the input field of the form
 * @param  {object} product product to be loaded
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function loadProduct(product) {
  return {
    type: LOAD_PRODUCT,
    product,
  };
}

/**
 * 
 * @param {string} form Nombre del form para ser actualizado  
 * @param {boolean} state  form's visibility
 * @return {object} An action object with a type of MAKE_FORM_VISIBLE
 */
export function changeFormState(form, new_state, opts){
  return{
    type: CHANGE_FORM_STATE,
    form,
    new_state,
    opts
  };
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_PRODUCT_NAME or CHANGE_PRODUCT_PRICE
 */
export function changeMod(property, value){
  switch (property) {
    case "name":
      return { type: CHANGE_MOD_NAME, name: value};
    case "type":
      return { type: CHANGE_MOD_TYPE, mod_type: value};
  }
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_OPT_NAME or CHANGE_OPT_PRICE
 */
export function changeOpt(property, value){
  switch (property) {
    case "name":
      return { type: CHANGE_OPT_NAME, name: value};
    case "price":
      return { type: CHANGE_OPT_PRICE, price: value};
  }
}


/**
 * 
 * @param {string} form Nombre del form para ser actualizado  
 * @param {boolean} state  form's visibility
 * @return {object} An action object with a type of MAKE_FORM_VISIBLE
 */
export function saveMod(){
  return { type: SAVE_MOD };
}

/**
 * 
 * @param {object} product Instancia de producto
 * @return {object} An action object with a type of CREATE_PRODUCT
 */
export function addModifierToProduct(product) {
  return {
    type: ADD_MOD,
    product,
  };
}

/**
 * @return {object} An action object with a type of SAVE_OPT
 */
export function saveOpt() {
  return {
    type: SAVE_OPT,
  };
}

/**
 * 
 * @param {object} product Instancia de producto
 * @return {object} An action object with a type of ADD_OPT
 */
export function addOptToModifier(product) {
  return {
    type: ADD_OPT,
    product,
  };
}