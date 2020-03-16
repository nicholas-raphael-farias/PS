import { ADD_MONEY, CANCEL_INCOME, CHOOSE_PAYMENT_METHOD } from './constants'

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