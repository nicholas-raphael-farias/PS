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

export const LOAD_PRODUCTS = 'ps/ProductsPage/LOAD_PRODUCTS';
export const LOAD_CATEGORIES = 'ps/ProductsPage/LOAD_CATEGORIES';
export const CREATE_PRODUCT = 'ps/ProductsPage/CREATE_PRODUCT';
export const CREATED_PRODUCT = 'ps/ProductsPage/CREATED_PRODUCT';
export const MAKE_FORM_VISIBLE = 'ps/ProductsPage/MAKE_FORM_VISIBLE';
export const SET_PRODUCT_VALUES = 'ps/ProductsPage/SET_PRODUCT_VALUES';