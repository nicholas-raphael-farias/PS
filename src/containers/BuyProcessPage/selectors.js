import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { isUndefined } from 'util';

const selectBuy = state => state.buyProcessPage || initialState;

const makeSelectProducts = () =>
  createSelector(
    selectBuy,
    empState => empState.products,
  );


const makeSelectBoughtProducts = () =>
  createSelector(
    selectBuy,
    empState => empState.bought_products,
  );

const makeSelectProductModifiers = () =>
  createSelector(
    selectBuy,
    empState => empState.product_modifiers.filter(m => m.order != -1),
  );

const makeSelectActiveModifier = () =>
  createSelector(
    selectBuy,
    empState => {
      if(empState.product_modifiers.length > 0){
        return empState.product_modifiers[0];
      } else {
        return {name:''};
      }
    },
  );

const makeSelectTicketSubtotal = () =>
  createSelector(
    selectBuy,
    empState => empState.bought_products.reduce((subtotal, p) => {

      const subtotal_modifiers = p.modifiers.reduce((subtotal_modifiers, m) => {

          const subtotal_options = m.options.reduce((subtotal_options, o) => subtotal_options + parseInt(o.price) , 0)

          return subtotal_modifiers + parseInt(subtotal_options)
      }, 0)


    return subtotal + parseInt(p.price) + parseInt(subtotal_modifiers)
    }, 0),
  );

const makeSelectActiveProduct = () =>
  createSelector(
    selectBuy,
    empState => empState.active_product
  );

const makeSelectStepBarHelper = () =>
  createSelector(
    selectBuy,
    empState => empState.step_bar_helper
  );

const makeSelectIsActiveEdit = () =>
  createSelector(
    selectBuy,
    empState => empState.is_active_edit_form
  );

const makeSelectIsReadyToCheckout = () =>
  createSelector(
    selectBuy,
    empState => empState.is_ready_to_checkout
  );

const makeSelectPromoCode = () =>
  createSelector(
    selectBuy,
    empState => empState.promo_code
  );

const makeSelectPromos = () =>
  createSelector(
    selectBuy,
    empState => empState.promos
  );

const makeSelectDiscount = () =>
  createSelector(
    selectBuy,
    empState => empState.discounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  );

  const makeSelectTicketId = () =>
  createSelector(
    selectBuy,
    empState => empState.ticket_id
  );


export { 
  makeSelectProducts, 
  makeSelectBoughtProducts, 
  makeSelectProductModifiers, 
  makeSelectActiveModifier, 
  makeSelectTicketSubtotal, 
  makeSelectActiveProduct, 
  makeSelectStepBarHelper, 
  makeSelectIsActiveEdit, 
  makeSelectIsReadyToCheckout,
  makeSelectPromoCode,
  makeSelectPromos,
  makeSelectDiscount,
  makeSelectTicketId,
 };