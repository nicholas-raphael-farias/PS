/*
 * ProductsConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_PRODUCT = 'ps/UltimatePage/LOAD_PRODUCT';
export const CHANGE_FORM_STATE = 'ps/UltimatePage/CHANGE_FORM_STATE';
export const CHANGE_MOD_NAME = 'ps/UltimatePage/CHANGE_MOD_NAME';
export const CHANGE_MOD_TYPE = 'ps/UltimatePage/CHANGE_MOD_TYPE';
export const SAVE_MOD = 'ps/UltimatePage/SAVE_MOD';
export const ADD_MOD = 'ps/UltimatePage/ADD_MOD';
export const CHANGE_OPT_NAME = 'ps/UltimatePage/CHANGE_OPT_NAME';
export const CHANGE_OPT_PRICE = 'ps/UltimatePage/CHANGE_OPT_PRICE';
export const SAVE_OPT = 'ps/UltimatePage/SAVE_OPT';
export const ADD_OPT = 'ps/UltimatePage/ADD_OPT';