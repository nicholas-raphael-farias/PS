/*
 * EmployeeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
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
  LOAD_EMPLOYEES,
} from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  email: '',
  phone: '',
  birthday: new Date(),
  isEmplFormVisible: false,
  isUpdteEmplFormVisible: false,
  employees: [],
  filterText: '',
  selectedEmplForUpdate: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const EmployeeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAME:
        draft.name = action.name;
        break;
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_PHONE:
        draft.phone = action.phone;
        break;
      case CHANGE_BIRTHDAY:
        draft.birthday = action.birthday;
        break;
      case CHANGE_FORM_VISIBILITY:
        draft.isEmplFormVisible = !draft.isEmplFormVisible;
        break;
      case CREATE_EMPLOYEE:
        draft.employees = draft.employees.concat([action.newEmplData]);
        break;
      case RESET_CREATE_EMPL_FORM:
        draft.isEmplFormVisible = false;
        draft.name = '';
        draft.phone = '';
        draft.email = '';
        draft.birthday = new Date();
        break;
      case CHANGE_FILTERTEXT:
        draft.filterText = action.filterText;
        break;
      case CHANGE_UPDATE_FORM_VISIBILITY:
        draft.isUpdteEmplFormVisible = !draft.isUpdteEmplFormVisible
        draft.selectedEmplForUpdate = action.emplData
        break;
      case UPDATE_EMPLOYEE:
        let employees = draft.employees
        let employeeIndex = employees.findIndex(employee => employee.name === draft.selectedEmplForUpdate.name)
        console.log(employees[employeeIndex])
        draft.employees[employeeIndex] = draft.selectedEmplForUpdate
        draft.isEmplFormVisible = false;
        draft.isUpdteEmplFormVisible = false;
        break;
      case CHANGE_EMPLOYEE_NAME:
        draft.selectedEmplForUpdate.name = action.newValue
        break;
      case CHANGE_EMPLOYEE_EMAIL:
        draft.selectedEmplForUpdate.email = action.newValue
        break;
      case CHANGE_EMPLOYEE_PHONE:
        draft.selectedEmplForUpdate.phone = action.newValue
        break;
      case CHANGE_EMPLOYEE_BIRTHDAY:
        draft.selectedEmplForUpdate.birthday = action.newValue
        break;
      case LOAD_EMPLOYEES:
        console.log("employeeeeees")
        draft.employees = action.data;
        break;
    }
  });

export default EmployeeReducer;