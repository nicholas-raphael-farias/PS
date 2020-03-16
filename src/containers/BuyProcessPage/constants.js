/*
 * LoginConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_PRODUCTS = 'ps/BuyProcessPage/LOAD_PRODUCTS';
export const ADD_TO_TICKET = 'ps/BuyProcessPage/ADD_TO_TICKET';
export const ADD_OPTION = 'ps/BuyProcessPage/ADD_OPTION';
export const SELECT_OPTION = 'ps/BuyProcessPage/SELECT_OPTION';
export const ADD_SELECTED_OPTIONS = 'ps/BuyProcessPage/ADD_SELECTED_OPTIONS';
export const CANCEL_PRODUCT = 'ps/BuyProcessPage/CANCEL_PRODUCT';
export const EDIT_MODIFIER = 'ps/BuyProcessPage/EDIT_MODIFIER';
export const ADD_EDITED_OPTION = 'ps/BuyProcessPage/ADD_EDITED_OPTION';
export const ADD_EDITED_SELECTED_OPTIONS = 'ps/BuyProcessPage/ADD_EDITED_SELECTED_OPTIONS';
export const DELETE_PRODUCT = 'ps/BuyProcessPage/DELETE_PRODUCT';
export const CLICK_BAD_PRODUCT = 'ps/BuyProcessPage/CLICK_BAD_PRODUCT';
export const REDIRECT_TO_CHECKOUT = 'ps/BuyProcessPage/REDIRECT_TO_CHECKOUT';
export const SAVE_TICKET = 'ps/BuyProcessPage/SAVE_TICKET';