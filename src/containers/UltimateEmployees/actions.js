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
  CHANGE_EMPLOYEE_NAME,
  CHANGE_EMPLOYEE_EMAIL,
  CHANGE_EMPLOYEE_PHONE,
  CHANGE_EMPLOYEE_BIRTHDAY,
  DELETE_EMPLOYEE,
  DELETED_EMPLOYEE,
  SELECT_EMPLOYEE,
  UPDATE_EMPLOYEE_NAME,
  UPDATE_EMPLOYEE_EMAIL,
  UPDATE_EMPLOYEE_PHONE,
  UPDATE_EMPLOYEE_BIRTHDAY,
  UPDATE_EMPLOYEE,
  UPDATED_EMPLOYEE,
  CHANGE_FILTER,
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
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_PRODUCT_NAME or CHANGE_PRODUCT_PRICE
 */
export function changeEmployee(property, value){
  switch (property) {
    case "name":
    return { type: CHANGE_EMPLOYEE_NAME, name: value};
    case "email":
    return { type: CHANGE_EMPLOYEE_EMAIL, email: value};
    case "phone":
    return { type: CHANGE_EMPLOYEE_PHONE, phone: value};
    case "birthday":
    return { type: CHANGE_EMPLOYEE_BIRTHDAY, birthday: value};
  }
}


/**
 * Changes the input field of the form
 * @return {object} An action object with a type of DELETE_EMPLOYEE
 */
export function deleteEmployee(_id) {
  return {
    type: DELETE_EMPLOYEE,
    _id,
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
 * 
 * @param {string} property product property to be change
 * * @param {string} value value to be change
 * @return {object} An action object with a type of CHANGE_PRODUCT_NAME or CHANGE_PRODUCT_PRICE
 */
export function updateEmployee(property, value){
  switch (property) {
    case "name":
    return { type: UPDATE_EMPLOYEE_NAME, name: value};
    case "email":
    return { type: UPDATE_EMPLOYEE_EMAIL, email: value};
    case "phone":
    return { type: UPDATE_EMPLOYEE_PHONE, phone: value};
    case "birthday":
    return { type: UPDATE_EMPLOYEE_BIRTHDAY, birthday: value};
  }
}


/**
 * Changes the input field of the form
 * @return {object} An action object with a type of DELETE_EMPLOYEE
 */
export function updateSelectedEmployee() {
  return {
    type: UPDATE_EMPLOYEE,
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
 * @param  {object} employeee Empleado de saga para actualizar 
 * @return {object} An action object with a type of UPDATED_EMPLOYEE
 */
export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    filter,
  };
}