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
export const SET_MOD_VALUES = 'ps/UltimatePage/SET_MOD_VALUES';
export const SAVE_MOD = 'ps/UltimatePage/SAVE_MOD';
export const ADD_MOD = 'ps/UltimatePage/ADD_MOD';
export const SET_OPT_VALUES = 'ps/UltimatePage/SET_OPT_VALUES';
export const SAVE_OPT = 'ps/UltimatePage/SAVE_OPT';
export const ADD_OPT = 'ps/UltimatePage/ADD_OPT';