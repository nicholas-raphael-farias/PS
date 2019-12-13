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

export const LOAD_EMPLOYEES = 'ps/UltimateEmpPage/LOAD_EMPLOYEES';
export const SAVE_EMPLOYEE = 'ps/UltimateEmpPage/SAVE_EMPLOYEE';
export const CREATE_EMPLOYEE = 'ps/UltimateEmpPage/CREATE_EMPLOYEE';
export const CHANGE_VISIBILITY = 'ps/UltimateEmpPage/CHANGE_VISIBILITY';
export const DELETE_EMPLOYEE = 'ps/UltimateEmpPage/DELETE_EMPLOYEE';
export const DELETED_EMPLOYEE = 'ps/UltimateEmpPage/DELETED_EMPLOYEE';
export const SELECT_EMPLOYEE = 'ps/UltimateEmpPage/SELECT_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'ps/UltimateEmpPage/UPDATE_EMPLOYEE';
export const UPDATED_EMPLOYEE = 'ps/UltimateEmpPage/UPDATED_EMPLOYEE';
export const CHANGE_FILTER = 'ps/UltimateEmpPage/CHANGE_FILTER';
export const UPDATE_PASSWORD = 'ps/UltimateEmpPage/UPDATE_PASSWORD';
export const UPDATED_PASSWORD = 'ps/UltimateEmpPage/UPDATED_PASSWORD';
export const CHANGE_NEW_PASSWORD = 'ps/UltimateEmpPage/CHANGE_NEW_PASSWORD';
export const SET_VALUES = 'ps/UltimateEmpPage/SET_VALUES';