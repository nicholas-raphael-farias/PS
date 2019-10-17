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

export const CHANGE_CODE = 'ps/LoginPage/CHANGE_CODE';
export const CHANGE_EMAIL = 'ps/LoginPage/CHANGE_EMAIL';
export const CHECK_CREDENTIALS = 'ps/LoginPage/CHECK_CREDENTIALS';
export const CREATE_SESSION = 'ps/LoginPage/CREATE_SESSION';