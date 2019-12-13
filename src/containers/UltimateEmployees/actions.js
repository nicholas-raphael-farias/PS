/*
 * Product Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  LOAD_EMPLOYEES, 
  SAVE_EMPLOYEE,
  CREATE_EMPLOYEE,
  CHANGE_VISIBILITY,
  DELETE_EMPLOYEE,
  DELETED_EMPLOYEE,
  SELECT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATED_EMPLOYEE,
  CHANGE_FILTER,
  UPDATE_PASSWORD,
  UPDATED_PASSWORD,
  CHANGE_NEW_PASSWORD,
  SET_VALUES,
 } from './constants';

/**
 * Changes the input field of the form
 * @param  {array} employees La lista de empleados
 * @return {object} An action object with a type of LOAD_EMPLOYEES
 */
export function loadEmployees(employees) {
  return {
    type: LOAD_EMPLOYEES,
    employees,
  };
}

/**
 * ACTION THAT SAGA LISTENS TO SAVE EMPLOYEE
 * @return {object} An action object with a type of SAVE_EMPLOYEE
 */
export function saveEmployee() {
  return {
    type: SAVE_EMPLOYEE,
  };
}


/**
 * Changes the input field of the form
 * @param  {object} employeee Empleado de saga para actualizar estado
 * @return {object} An action object with a type of CREATE_EMPLOYEE
 */
export function createEmployee(employee) {
  return {
    type: CREATE_EMPLOYEE,
    employee,
  };
}

/**
 * Changes the input field of the form
 * @param  {object} employeee Empleado de saga para actualizar estado
 * @return {object} An action object with a type of CREATE_EMPLOYEE
 */
export function changeVisibility(who, visibility) {
  return {
    type: CHANGE_VISIBILITY,
    who,
    visibility,
  };
}


/**
 * Changes the input field of the form
 * @return {object} An action object with a type of DELETE_EMPLOYEE
 */
export function deleteEmployee(employee) {
  return {
    type: DELETE_EMPLOYEE,
    employee,
  };
}


/**
 * Changes the input field of the form
 * @param  {object} employeee Empleado de saga para eliminar 
 * @return {object} An action object with a type of DELETED_EMPLOYEE
 */
export function deletedEmployee(employee) {
  return {
    type: DELETED_EMPLOYEE,
    employee,
  };
}

/**
 * ACTION THAT SAGA LISTENS TO SAVE EMPLOYEE
 * @return {object} An action object with a type of SAVE_EMPLOYEE
 */
export function selectEmployee(_id) {
  return {
    type: SELECT_EMPLOYEE,
    _id,
  };
}


/**
 * Changes the input field of the form
 * @return {object} An action object with a type of DELETE_EMPLOYEE
 */
export function updateSelectedEmployee(employee_data) {
  return {
    type: UPDATE_EMPLOYEE,
    employee_data,
  };
}


/**
 * Changes the input field of the form
 * @param  {object} employeee Empleado de saga para actualizar 
 * @return {object} An action object with a type of UPDATED_EMPLOYEE
 */
export function updatedEmployee(employee) {
  return {
    type: UPDATED_EMPLOYEE,
    employee,
  };
}

/**
 * Changes the input field of the form
 * @param  {object} employee Empleado de saga para actualizar 
 * @return {object} An action object with a type of UPDATED_EMPLOYEE
 */
export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    filter,
  };
}

/**
 * Changes the input field of the form
 * @param  {string} password to be updated
 * @return {object} An action object with a type of UPDATE_PASSWORD
 */
export function changeNewPswd(password) {
  return {
    type: CHANGE_NEW_PASSWORD,
    password,
  };
}

/**
 * Changes the input field of the form
 * @return {object} An action object with a type of UPDATE_PASSWORD
 */
export function updatePassword(new_password) {
  return {
    type: UPDATE_PASSWORD,
    new_password
  };
}

/**
 * Changes the input field of the form
 * @param  {object} employee Empleado de saga para actualizar
 * @return {object} An action object with a type of UPDATED_PASSWORD
 */
export function updatedPassword(employee) {
  return {
    type: UPDATED_PASSWORD,
    employee,
  };
}


/**
 * Sets the create employee form values on the reducer
 * @param  {object} values an object with the new employee data
 * @return {object} An action object with a type of SET_VALUES and the new employee data
 */
export function setValues(new_employee_data) {
  return {
    type: SET_VALUES,
    new_employee_data,
  };
}