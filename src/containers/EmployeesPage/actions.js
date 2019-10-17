/*
 * Employee Actions
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
  CHANGE_NAME, 
  CHANGE_EMAIL, 
  CHANGE_PHONE, 
  CHANGE_BIRTHDAY, 
  CHANGE_FORM_VISIBILITY, 
  CREATE_EMPLOYEE,
  CHANGE_FILTERTEXT,
  CHANGE_UPDATE_FORM_VISIBILITY,
  UPDATE_EMPLOYEE,
  CHANGE_EMPLOYEE_NAME,
  CHANGE_EMPLOYEE_EMAIL,
  CHANGE_EMPLOYEE_PHONE,
  CHANGE_EMPLOYEE_BIRTHDAY,
  RESET_CREATE_EMPL_FORM,
  COMPONENT_DID_MOUNT,
  LOAD_EMPLOYEES,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} name The new text of the input field
 * @param  {string} email The new text of the input field
 * @param  {string} phone The new text of the input field
 * @param  {date} birthday The new text of the input field
 * @param  {boolean} isEmplFormVisible The new text of the input field
 * @param  {object} newEmplData The new text of the input field
 * @param  {string} filterText The new text of the input field
 * @param  {boolean} isUpdteEmplFormVisible The new text of the input field
 * @return {object} An action object
 */
export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePhone(phone) {
  return {
    type: CHANGE_PHONE,
    phone,
  };
}

export function changeBirthday(birthday) {
  return {
    type: CHANGE_BIRTHDAY,
    birthday,
  };
}

export function changeFormVisibility(isEmplFormVisible) {
  return {
    type: CHANGE_FORM_VISIBILITY,
    isEmplFormVisible,
  };
}

export function changeUpdteFormVisibility(emplData) {
  return {
    type: CHANGE_UPDATE_FORM_VISIBILITY,
    emplData,
  };
}

export function createEmployee(newEmplData) {
  return {
    type: CREATE_EMPLOYEE,
    newEmplData,
  };
}

export function changeFilterText(filterText) {
  return {
    type: CHANGE_FILTERTEXT,
    filterText,
  };
}

export function updateEmployee(updatedEmployee) {
  return {
    type: UPDATE_EMPLOYEE,
    updatedEmployee,
  };
}

export function changeUpdateEmployee(type, newValue) {
  switch (type) {
    case "name":
      return { type: CHANGE_EMPLOYEE_NAME, newValue};
    case 'email':
      return { type: CHANGE_EMPLOYEE_EMAIL, newValue};
    case 'phone':
      return { type: CHANGE_EMPLOYEE_PHONE, newValue};
    default:
      return { type: CHANGE_EMPLOYEE_BIRTHDAY, newValue};
  }
}

export function resetCreateEmplForm() {
  return {
    type: RESET_CREATE_EMPL_FORM,
  };
}

export function loadEmployees(data) {
  console.log("actions ssss");
  return {
    type: LOAD_EMPLOYEES,
    data,
  };
}