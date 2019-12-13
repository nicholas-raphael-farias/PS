import { 
  LOAD_PRODUCTS, 
  ADD_TO_TICKET, 
  CLICK_BAD_PRODUCT, 
  ADD_OPTION, 
  SELECT_OPTION,
  ADD_SELECTED_OPTIONS,
  CANCEL_PRODUCT,
  EDIT_MODIFIER,
  ADD_EDITED_OPTION,
  ADD_EDITED_SELECTED_OPTIONS,
  DELETE_PRODUCT,
  REDIRECT_TO_CHECKOUT } from './constants'

/**
 * Changes the input field of the form
 * @param  {array} products La lista de productos
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
 * @param  {object} product Producto para agregar al ticket
 * @return {object} An action object with a type of LOAD_PRODUCTS
 */
export function addToTicket(product) {
  const assigned_products = product.modifiers.filter(m => m.order !== -1)
  if (assigned_products.length > 0) {
    return {
      type: ADD_TO_TICKET,
      product,
    };
  }
  else {
    return { type: CLICK_BAD_PRODUCT};
  }
}


/**
 * Changes the input field of the form
 * @param  {object} option option to be added
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of ADD_OPTION
 */
export function addOption(option, modifier_name) {
  return {
    type: ADD_OPTION,
    option,
    modifier_name
  };
}


/**
 * Changes the input field of the form
 * @param  {object} option option to be selected
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of SELECT_OPTION
 */
export function selectOption(option, modifier_name) {
  return {
    type: SELECT_OPTION,
    option,
    modifier_name
  };
}


/**
 * Changes the input field of the form
 * @param  {array} options lista de opciones del modificador
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of ADD_SELECTED_OPTIONS
 */
export function addSelectedOptions(options, modifier_name) {
  return {
    type: ADD_SELECTED_OPTIONS,
    options,
    modifier_name
  };
}

/**
 * Changes the input field of the form
 * @return {object} An action object with a type of ADD_SELECTED_OPTIONS
 */
export function cancelProduct() {
  return {
    type: CANCEL_PRODUCT,
  };
}

/**
 * Changes the input field of the form
 * @param  {string} ticket_id product's ticket_id
 * @return {object} An action object with a type of SELECT_ACTIVE_PRODUCT
 */
export function editModifier(ticket_id, modifier_name) {
  return {
    type: EDIT_MODIFIER,
    ticket_id,
    modifier_name
  };
}



/**
 * Changes the input field of the form
 * @param  {object} option option to be added
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of ADD_OPTION
 */
export function addEditedOption(option, modifier_name) {
  return {
    type: ADD_EDITED_OPTION,
    option,
    modifier_name
  };
}


/**
 * Changes the input field of the form
 * @param  {array} options lista de opciones del modificador
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of ADD_SELECTED_OPTIONS
 */
export function addEditedSelectedOptions(options, modifier_name) {
  return {
    type: ADD_EDITED_SELECTED_OPTIONS,
    options,
    modifier_name
  };
}


/**
 * Deletes a product from ticket
 * @param  {array} ticket_id producto para eliminar
 * @param  {string} modifier_name option's modifier
 * @return {object} An action object with a type of ADD_SELECTED_OPTIONS
 */
export function deleteProduct(ticket_id) {
  return {
    type: DELETE_PRODUCT,
    ticket_id,
  };
}

/**
 * Redirects to checkout 
 * @return {object} An action object with a type of REDIRECT_TO_CHECKOUT
 */
export function redirectToCheckout() {
  return {
    type: REDIRECT_TO_CHECKOUT,
  };
}