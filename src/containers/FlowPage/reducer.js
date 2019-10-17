/*
 * LoginReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_PRODUCTS, CHOOSE_PRODUCT, DRAG_AND_DROP, ADD_AND_DROP, UNASSIGN_MODIFIER, ADD_FIRST_ITEM, SAVE_MODIFIERS, UPDATE_PRODUCT } from './constants';
import { chooseProduct } from './actions';

// The initial state of the App
export const initialState = {
  products: [],
  chosenProductId: '',
  helper:0,
  modToUnassign: '',
  orderToUnassign:'',
};

/* eslint-disable default-case, no-param-reassign */
const flowReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PRODUCTS:
        console.log(action);
        draft.products = action.products;
        break;
      case CHOOSE_PRODUCT:
        draft.chosenProductId = action.productId;
        break;
      case DRAG_AND_DROP:

        let modifiers = draft.products.find(product => product._id === draft.chosenProductId).modifiers;
        console.log("modifiers before");
        console.log(modifiers);
        let productIndex = draft.products.findIndex(product => product._id === draft.chosenProductId);

        let drag = modifiers.find(mod => action.dragOrder === mod.order);
        let dragIndex = modifiers.findIndex(mod => action.dragOrder === mod.order);
        let hover = modifiers.find(mod => action.hoverOrder === mod.order);
        let hoverIndex = modifiers.findIndex(mod => action.hoverOrder === mod.order);
        drag.order = action.hoverOrder;
        hover.order = action.dragOrder;
        modifiers[dragIndex] = hover;
        modifiers[hoverIndex] = drag;
        draft.products[productIndex].modifiers = modifiers;

        console.log(action);
        console.log(action.dragOrder);
        console.log(action.hoverOrder);
        break;
      case ADD_AND_DROP:
          console.log(action);
          console.log(action.dragName);
          console.log(action.hoverOrder);

          
        let modifiersD = draft.products.find(product => product._id === draft.chosenProductId).modifiers;
        const productIndexD = draft.products.findIndex(product => product._id === draft.chosenProductId);
        const mod = modifiersD.find(mod => mod.name === action.dragName);
        modifiersD = modifiersD.filter(mod => mod.name !== action.dragName);
        mod.order = action.hoverOrder + 1;
        mod.is_assigned = true;
        console.log("modifiers before");
        console.log(modifiersD);
        console.log("modifiers after");
        let new_modifiers = modifiersD.map(mod => {
          if (mod.order > action.hoverOrder) {
            mod.order = mod.order + 1;
          }
          return mod;
        });

        console.log(new_modifiers);
        console.log("adding -1");
        new_modifiers.splice(action.hoverOrder, 0, mod);
        console.log(new_modifiers);
        draft.products[productIndexD].modifiers = new_modifiers;
        console.log(action);
        console.log(action.hoverOrder);
        break;

      case UNASSIGN_MODIFIER:
        console.log("reducer");
        console.log(action.mod_name);
        console.log(action.mod_order);
        draft.modToUnassign = action.mod_name;
        draft.orderToUnassign = action.mod_order;
        break;

      case ADD_FIRST_ITEM:
        console.log("ADD FIRST ITEM");
        console.log(action.item);
        let modifiersA = draft.products.find(product => product._id === draft.chosenProductId).modifiers;
        let assignedMods = modifiersA.filter(mod => mod.is_assigned);
        if(action.item.order === -1 && assignedMods.length === 0){
          let modifiersA = draft.products.find(product => product._id === draft.chosenProductId).modifiers;
          const productIndexA = draft.products.findIndex(product => product._id === draft.chosenProductId);
          const modA = modifiersA.find(mod => mod.name === action.item.name);
          modifiersA = modifiersA.filter(mod => mod.name !== action.item.name);
          modA.is_assigned = true;
          modA.order = 0;
          modifiersA.push(modA);
          draft.products[productIndexA].modifiers = modifiersA;
        }
        break;
      case SAVE_MODIFIERS:
        break;
      case UPDATE_PRODUCT:
        let pI = draft.products.findIndex(p => p._id === action.product._id);
        draft.products[pI] = action.product;
        break;
    }
  });

export default flowReducer;