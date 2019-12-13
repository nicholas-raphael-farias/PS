import { 
  LOAD_PRODUCT,
  CHANGE_FORM_STATE,
  SET_MOD_VALUES,
  SAVE_MOD,
  ADD_MOD,
  SET_OPT_VALUES,
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
export function setModValues(modifier){
  return{
    type: SET_MOD_VALUES,
    modifier,
  }
}

/**
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_PRODUCT_NAME or CHANGE_PRODUCT_PRICE
 */
export function setOptValues(option){
  return{
    type: SET_OPT_VALUES,
    option,
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