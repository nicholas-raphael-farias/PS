/*
 * ProductReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  CREATE_EMPLOYEE, 
  SAVE_EMPLOYEE,
  LOAD_EMPLOYEES, 
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
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  employees: [],
  isCreatePrdFormVisible: false,
  name: '',
  email: '',
  phone: '',
  birthday: new Date(),
  is_crtForm_visible: false,
  is_updtForm_visible: false,
  selected_employee: {
    _id: 'xxxxxxx',
    name:'',
    email:'',
    phone:'',
    birthday: new Date(),
  },
  filter:'',
};

/* eslint-disable default-case, no-param-reassign */
const productsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_EMPLOYEES:
        draft.employees = action.employees;
        break;
      case SAVE_EMPLOYEE:
        break;
      case CREATE_EMPLOYEE:
        draft.employees = draft.employees.concat([action.employee]);
        draft.name = '';
        draft.email = '';
        draft.phone = '';
        draft.birthday = new Date();
        draft.is_crtForm_visible = false;
        break;

      case CHANGE_VISIBILITY:
        switch (action.who) {
          case "crtForm":            
            draft.is_crtForm_visible = action.visibility;
            break;
          case "updtForm":            
            draft.is_updtForm_visible = action.visibility;
            break;
        }
        break;
      case CHANGE_EMPLOYEE_NAME:
        draft.name = action.name; 
        break;
      case CHANGE_EMPLOYEE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_EMPLOYEE_PHONE:
        draft.phone = action.phone;
        break;
      case CHANGE_EMPLOYEE_BIRTHDAY:
        draft.birthday = action.birthday;
        break;

      case DELETE_EMPLOYEE:
        draft.selected_employee = draft.employees.find(e => e._id === action._id);
        break;
      case DELETED_EMPLOYEE:
        let e_index = draft.employees.findIndex(e => e._id === action.employee._id);
        draft.employees.splice(1, e_index);
        break;
      case SELECT_EMPLOYEE:
        draft.selected_employee = draft.employees.find(e => e._id === action._id);
        break;

      case UPDATE_EMPLOYEE_NAME:
        draft.selected_employee.name = action.name;
        break;

      case UPDATE_EMPLOYEE_EMAIL:
        draft.selected_employee.email = action.email;
        break;

      case UPDATE_EMPLOYEE_PHONE:
        draft.selected_employee.phone = action.phone;
        break;

      case UPDATE_EMPLOYEE_BIRTHDAY:
        draft.selected_employee.birthday = action.birthday;
        break;

      case UPDATE_EMPLOYEE:
        break;
      case UPDATED_EMPLOYEE:
        let updt_index = draft.employees.findIndex(e => e._id === action.employee._id);
        draft.employees[updt_index] = action.employee;
        draft.is_updtForm_visible = false;
        break

      case CHANGE_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default productsReducer;