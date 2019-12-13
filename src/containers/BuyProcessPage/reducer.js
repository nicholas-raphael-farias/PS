/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  LOAD_PRODUCTS, 
  ADD_TO_TICKET, 
  ADD_OPTION, 
  SELECT_OPTION, 
  ADD_SELECTED_OPTIONS, 
  CANCEL_PRODUCT,
  EDIT_MODIFIER,
  ADD_EDITED_OPTION,
  ADD_EDITED_SELECTED_OPTIONS,
  DELETE_PRODUCT,
  REDIRECT_TO_CHECKOUT } from './constants';

// The initial state of the App
export const initialState = {
  products:[],
  bought_products:[],
  product_count:0,
  product_modifiers:[],
  step_bar_helper:[],
  active_modifier:{
    name:'',
  },
  active_product:'',
  is_active_edit_form: false,
  is_ready_to_checkout: false,
};

/* eslint-disable default-case, no-param-reassign */
const buyProcessReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PRODUCTS:
        draft.products = action.products;
        break;
      case ADD_TO_TICKET:
        console.log(action)
        const new_product = {
          _id: action.product._id,
          ticket_id: `${action.product._id}_${draft.bought_products.length}`, 
          order: action.product.order,
          name: action.product.name,
          price: action.product.price,
          modifiers: [],
        }
        draft.active_product = new_product.ticket_id;
        new_product.order = draft.product_count;
        draft.bought_products = draft.bought_products.concat([new_product]);
        draft.product_count = draft.product_count + 1;
        
        draft.product_modifiers = 
          action.product.modifiers
          .sort((a, b) => a.order - b.order)

        draft.step_bar_helper = 
          action.product.modifiers.
          sort((a, b) => a.order - b.order)
          .map(m => {
            return {
              name: m.name,
              was_completed: false,
            }
          })
        break;
      case ADD_OPTION:
        let product = draft.bought_products.find(p => p.ticket_id === draft.active_product)
        let product_index = draft.bought_products.findIndex(p => p.ticket_id === draft.active_product)
        let active_modifier = draft.product_modifiers[0]
        product.modifiers = product.modifiers.concat([{
          name: active_modifier.name,
          options: [action.option]
        }])
        draft.bought_products[product_index] = product
        draft.product_modifiers.shift();

        let e = draft.step_bar_helper.find(m => m.name === action.modifier_name)
        let eI = draft.step_bar_helper.findIndex(m => m.name === action.modifier_name)
        console.log(e)
        e.was_completed = true
        draft.step_bar_helper[eI] = e
        break;

      case SELECT_OPTION:

        let modifier = draft.product_modifiers.find(m => m.name === action.modifier_name)
        let modifier_index = draft.product_modifiers.findIndex(m => m.name === action.modifier_name)
        let option = modifier.options.find(o => o.name === action.option.name)
        let option_index = modifier.options.findIndex(o => o.name === action.option.name)
        option.is_selected = !option.is_selected
        modifier.options[option_index] = option
        break;

      case ADD_SELECTED_OPTIONS:
        console.log("action")
        console.log(action.modifiers)
        console.log(action.modifier_name)

        let productS = draft.bought_products.find(p => p.ticket_id === draft.active_product)
        let product_indexS = draft.bought_products.findIndex(p => p.ticket_id === draft.active_product)

        //productS.options = productS.options.concat(action.options.filter(o => o.is_selected))

        productS.modifiers = productS.modifiers.concat({
          name: action.modifier_name,
          options: action.options.filter(o => o.is_selected)
        })

        draft.bought_products[product_indexS] = productS
        draft.product_modifiers.shift();

        let eS = draft.step_bar_helper.find(m => m.name === action.modifier_name)
        let eIS = draft.step_bar_helper.findIndex(m => m.name === action.modifier_name)
        console.log(eS)
        eS.was_completed = true
        draft.step_bar_helper[eIS] = eS

        break;
      case CANCEL_PRODUCT:

        if(draft.is_active_edit_form){
          draft.product_modifiers = []
          draft.is_active_edit_form = false
        } else {
          draft.product_modifiers = []
          draft.step_bar_helper = []
          draft.bought_products.pop()
        }
        break;
      case EDIT_MODIFIER:
        if(draft.product_modifiers.length === 0) {
          console.log("EDIT_MODIFIER")
          console.log(action.ticket_id)
          console.log(action.modifier_name)
          draft.is_active_edit_form = true
          draft.active_product = action.ticket_id
          let p = draft.products.find(p => p._id === action.ticket_id.split("_")[0])
          let m = p.modifiers.find(m => m.name === action.modifier_name)
          draft.product_modifiers = [m]
        }
        break;

      case ADD_EDITED_OPTION:

        let productE = draft.bought_products.find(p => p.ticket_id === draft.active_product)
        let product_indexE = draft.bought_products.findIndex(p => p.ticket_id === draft.active_product)
      
        let modifier_indexE = productE.modifiers.findIndex(m => m.name === action.modifier_name)
        productE.modifiers[modifier_indexE] = {
          name: action.modifier_name,
          options: [action.option]
        }

        draft.bought_products[product_indexE] = productE
        draft.product_modifiers = [];
        draft.is_active_edit_form = false;
  
        break;
      case ADD_EDITED_SELECTED_OPTIONS:


          console.log("action")
          console.log(action.modifiers)
          console.log(action.modifier_name)
  
          let productES = draft.bought_products.find(p => p.ticket_id === draft.active_product)
          let product_indexES = draft.bought_products.findIndex(p => p.ticket_id === draft.active_product)
  
          //productS.options = productS.options.concat(action.options.filter(o => o.is_selected))
          let modifier_indexES = productES.modifiers.findIndex(m => m.name === action.modifier_name)
          productES.modifiers[modifier_indexES] = {
            name: action.modifier_name,
            options: action.options.filter(o => o.is_selected)
          }
  
          draft.bought_products[product_indexES] = productES
          draft.product_modifiers = [];
          draft.is_active_edit_form = false;

        break;
        case DELETE_PRODUCT:
          if(draft.product_modifiers.length === 0) {
            console.log("delete")
            console.log(action.ticket_id)
            let p_index = draft.bought_products.findIndex(p => p.ticket_id === action.ticket_id)
            draft.bought_products.splice(p_index, 1);
          }
          break;
      case REDIRECT_TO_CHECKOUT:
        draft.is_ready_to_checkout = true;
        break;
      default:
        break;
    }
  });

export default buyProcessReducer;