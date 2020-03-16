/*
 * CheckoutConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_MONEY = 'ps/CheckoutPage/ADD_MONEY';
export const CANCEL_INCOME = 'ps/CheckoutPage/CANCEL_INCOME';
export const CHOOSE_PAYMENT_METHOD = 'ps/CheckoutPage/CHOOSE_PAYMENT_METHOD';
export const SAVE_TICKET = 'ps/CheckoutPage/SAVE_TICKET';