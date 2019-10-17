/*
 * Employee Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_NAME = 'ps/EmployeesPage/CHANGE_NAME';
export const CHANGE_EMAIL = 'ps/EmployeesPage/CHANGE_EMAIL';
export const CHANGE_PHONE = 'ps/EmployeesPage/CHANGE_PHONE';
export const CHANGE_BIRTHDAY = 'ps/EmployeesPage/CHANGE_BIRTHDAY';
export const CHANGE_CODE = 'ps/EmployeesPage/CHANGE_CODE';
export const CHANGE_STATUS = 'ps/EmployeesPage/CHANGE_STATUS';
export const CHANGE_FORM_VISIBILITY = 'ps/EmployeesPage/CHANGE_FORM_VISIBILITY';
export const CHANGE_UPDATE_FORM_VISIBILITY = 'ps/EmployeesPage/CHANGE_UPDATE_FORM_VISIBILITY';
export const CREATE_EMPLOYEE = 'ps/EmployeesPage/CREATE_EMPLOYEE';
export const CHANGE_FILTERTEXT = 'ps/EmployeesPage/CHANGE_FILTERTEXT';
export const UPDATE_EMPLOYEE = 'ps/EmployeesPage/UPDATE_EMPLOYEE';
export const CHANGE_EMPLOYEE_NAME = 'ps/EmployeesPage/CHANGE_EMPLOYEE_NAME';
export const CHANGE_EMPLOYEE_EMAIL = 'ps/EmployeesPage/CHANGE_EMPLOYEE_EMAIL';
export const CHANGE_EMPLOYEE_PHONE = 'ps/EmployeesPage/CHANGE_EMPLOYEE_PHONE';
export const CHANGE_EMPLOYEE_BIRTHDAY = 'ps/EmployeesPage/CHANGE_EMPLOYEE_BIRTHDAY';
export const RESET_CREATE_EMPL_FORM = 'ps/EmployeesPage/RESET_CREATE_EMPL_FORM';
export const LOAD_EMPLOYEES = 'ps/EmployeesPage/LOAD_EMPLOYEES';