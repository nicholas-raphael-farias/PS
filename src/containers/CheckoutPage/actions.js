import { 
  ADD_MONEY, 
  CANCEL_INCOME, 
  CHOOSE_PAYMENT_METHOD, 
  LOAD_TICKET, 
  SAVE_PAYMENT_METHOD, 
  PAY_TICKET,
  CHANGE_PAD_TYPE} from './constants'

/**
 * Changes the input field of the form
 * @param  {int} amount Cantidad a agregar a la cuenta
 * @return {object} An action object with a type of ADD_MONEY
 */
export function addMoney(amount) {
  return {
    type: ADD_MONEY,
    amount,
  };
}

/**
 * Resets the money given by the client
 * @return {object} An action object with a type of CANCEL_INCOME
 */
export function cancelIncome() {
  return {
    type: CANCEL_INCOME,
  };
}


/**
 * Resets the money given by the client
 * @param  {string} payment_method payment with card or cash 
 * @return {object} An action object with a type of CANCEL_INCOME
 */
export function choosePaymentMethod(payment_method) {
  return {
    type: CHOOSE_PAYMENT_METHOD,
    payment_method,
  };
}


/**
 * Loads the ticket id from the url
 * @param  {string} ticket_id ticket_id 
 * @return {object} An action object with a type of LOAD_TICKET_ID
 */
export function loadTicket(ticket) {
  return {
    type: LOAD_TICKET,
    ticket,
  };
}

/**
 * Saves the payment method to the DB
 * @param  {string} payment_method payment with card or cash 
 * @return {object} An action object with a type of SAVE_PAYMENT_METHOD
 */
export function savePaymentMethod() {
  return {
    type: SAVE_PAYMENT_METHOD,
  };
}

/**
 * Pays ticket
 * @return {object} An action object with a type of PAY_TICKET
 */
export function payTicket() {
  return {
    type: PAY_TICKET,
  };
}

/**
 * Changes pad type 
 * @return {object} An action object with a type of PAY_TICKET
 */
export function changePadType() {
  return {
    type: CHANGE_PAD_TYPE,
  };
}