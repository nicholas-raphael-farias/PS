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
  DELETE_EMPLOYEE,
  DELETED_EMPLOYEE,
  SELECT_EMPLOYEE,
  UPDATE_EMPLOYEE,
  UPDATED_EMPLOYEE,
  CHANGE_FILTER,
  CHANGE_EMPLOYEE_PASSWORD,
  UPDATE_PASSWORD,
  UPDATED_PASSWORD,
  CHANGE_NEW_PASSWORD,
  SET_VALUES,
} from './constants';
import { da } from 'date-fns/esm/locale';

// The initial state of the App
export const initialState = {
  employees: [],
  isCreatePrdFormVisible: false,
  name: '',
  email: '',
  phone: '',
  birthday: '',
  password: '',
  new_password: '',
  is_new_password_visible: false,
  is_crtForm_visible: false,
  is_updtForm_visible: false,
  is_updtPswdForm_visible: false,
  is_password_visible: false,
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
        draft.employees = action.employees
        break
      case SAVE_EMPLOYEE:
        break
      case CREATE_EMPLOYEE:
        draft.employees = draft.employees.concat([action.employee])
        draft.name = ''
        draft.email = ''
        draft.phone = ''
        draft.birthday = new Date()
        draft.is_crtForm_visible = false
        break

      case CHANGE_VISIBILITY:
        switch (action.who) {
          case "crtForm":            
            draft.is_crtForm_visible = action.visibility
            break
          case "updtForm":            
            draft.is_updtForm_visible = action.visibility
            break
          case "updtPswdForm":
            draft.is_updtPswdForm_visible = action.visibility
            break
          case "password":
            draft.is_password_visible = action.visibility
            break
          case "new_password":
            draft.is_new_password_visible = action.visibility
            break
        }
        break;
      case DELETE_EMPLOYEE:
        //draft.selected_employee = draft.employees.find(e => e._id === action._id);
        break
      case DELETED_EMPLOYEE:
          draft.employees = draft.employees.filter(e => e._id !== action.employee._id)
        break
      case SELECT_EMPLOYEE:
        console.log('select employee')
        let xx = draft.employees.find(e => e._id === action._id)
        draft.selected_employee = xx
        console.log(JSON.stringify(xx))
        break

      case UPDATE_EMPLOYEE:
        console.log(action)
        let data = action.employee_data
        let selected_employee = draft.selected_employee
        selected_employee.name = data.name
        selected_employee.email = data.email
        selected_employee.phone = data.phone
        selected_employee.birthday = data.birthday
        draft.selected_employee = selected_employee
        break
      case UPDATED_EMPLOYEE:
        let updt_index = draft.employees.findIndex(e => e._id === action.employee._id)
        draft.employees[updt_index] = action.employee
        draft.is_updtForm_visible = false
        break
      case UPDATE_PASSWORD:
        break
      case UPDATED_PASSWORD:
        let updt_pswd_index = draft.employees.findIndex(e => e._id === action.employee._id)
        draft.employees[updt_pswd_index] = action.employee
        draft.is_updtPswdForm_visible = false
        break
      case CHANGE_NEW_PASSWORD:
        draft.new_password = action.password
        break

      case CHANGE_FILTER:
        draft.filter = action.filter
        break

      case SET_VALUES:
        draft.name = action.new_employee_data.name
        draft.email = action.new_employee_data.email
        draft.phone = action.new_employee_data.phone
        draft.birthday = action.new_employee_data.birthday
        draft.password = action.new_employee_data.password
        break
    }
  });

export default productsReducer;