/*
 * Discount Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_PROMOS = 'ps/DiscountsPage/LOAD_PROMOS';
export const CHANGE_VALUE = 'ps/DiscountsPage/CHANGE_VALUE'; 
export const CHANGE_NP_VALUE = 'ps/DiscountsPage/CHANGE_NP_VALUE';
export const SAVE_PROMO = 'ps/DiscountsPage/SAVE_PROMO';
export const RESET_CRT_PROMO_FORM = 'ps/DiscountsPage/RESET_CRT_PROMO_FORM';
export const DELETE_PROMO = 'ps/DiscountsPage/DELETE_PROMO';
export const SELECT_PROMO = 'ps/DiscountsPage/SELECT_PROMO';