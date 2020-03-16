import React, { useEffect, memo } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import {getServerUrl} from './../../utils/serverURL';

import { loadProducts, addToTicket, addOption, selectOption, addSelectedOptions, cancelProduct, editModifier, addEditedOption, addEditedSelectedOptions, deleteProduct, redirectToCheckout, saveTicket } from './actions';

import { makeSelectProducts, makeSelectBoughtProducts, makeSelectProductModifiers, makeSelectTicketSubtotal, makeSelectActiveModifier, makeSelectActiveProduct, makeSelectStepBarHelper, makeSelectIsActiveEdit, makeSelectIsReadyToCheckout } from './selectors';

import reducer from './reducer';
import saga from './saga';

import Ticket from './../../components/Ticket'
import Chooser from './../../components/Chooser'
import Timeline from './../../components/Timeline'
import ModifierEditor from './../../components/ModifierEditor'

const key = 'buyProcessPage';


export function BuyProcessPage({
  products,
  bought_products,
  product_modifiers,
  active_modifier,
  subtotal,
  active_product,
  step_bar_helper,
  is_active_edit,
  is_ready_to_checkout,
  onLoadProducts,
  onAddToTicket,
  onAddOption,
  onSelectOption,
  onAddSelectedOption,
  onCancelProduct,
  onEditModifier,
  onAddEditedOption,
  onAddEditedSelectedOption,
  onDeleteProduct,
  onRedirectToCheckout,
  onSaveTicket,
}) {

  useEffect(()=>{

    const requestURL = `${getServerUrl()}/products`;
    try {

      axios.get(requestURL)
      .then(({ data }) => {
        console.log(data.data);
        onLoadProducts(data.data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  },[])
  
  useInjectReducer({ key, reducer });
  useInjectSaga({key, saga});
    
  return (
    <div className="container-fluid">
      <div className="row">

        { is_ready_to_checkout ? <Redirect to="/employees/checkout" />  : null }
        {is_active_edit ? <ModifierEditor active_modifier={active_modifier} onCancelProduct={onCancelProduct} onAddEditedOption={onAddEditedOption} onSelectOption={onSelectOption} onAddEditedSelectedOption={onAddEditedSelectedOption}/> :

          <Chooser 
          products={products} 
          product_modifiers={product_modifiers} 
          active_modifier={active_modifier} 
          step_bar_helper={step_bar_helper}
          onAddToTicket={onAddToTicket} 
          onAddOption={onAddOption}
          onSelectOption={onSelectOption}
          onAddSelectedOption={onAddSelectedOption}
          onCancelProduct={onCancelProduct}
        />
        }
        <Ticket 
        bought_products={bought_products} 
        subtotal={subtotal}
        onEditModifier={onEditModifier}
        onDeleteProduct={onDeleteProduct}
        onRedirectToCheckout={onRedirectToCheckout}
        product_modifiers={product_modifiers}
        onCancelProduct={onCancelProduct}
        onSaveTicket={onSaveTicket} />
      </div>
    </div>
  )
}
  
  BuyProcessPage.propTypes = {};
  
  const mapStateToProps = createStructuredSelector({
    products: makeSelectProducts(),
    bought_products: makeSelectBoughtProducts(),
    product_modifiers: makeSelectProductModifiers(),
    active_modifier: makeSelectActiveModifier(),
    subtotal: makeSelectTicketSubtotal(),
    active_product: makeSelectActiveProduct(),
    step_bar_helper: makeSelectStepBarHelper(),
    is_active_edit: makeSelectIsActiveEdit(),
    is_ready_to_checkout: makeSelectIsReadyToCheckout(),
  });
  
  export function mapDispatchToProps(dispatch) {
    return {
      onLoadProducts: (products) => dispatch(loadProducts(products)),
      onAddToTicket: (product) => dispatch(addToTicket(product)),
      onAddOption: (opt, modifier) => dispatch(addOption(opt, modifier)),
      onSelectOption: (opt, modifier) => dispatch(selectOption(opt, modifier)),
      onAddSelectedOption: (opts, modifier) => dispatch(addSelectedOptions(opts, modifier)),
      onCancelProduct: () => dispatch(cancelProduct()),
      onEditModifier: (ticket_id, modifier_name) => dispatch(editModifier(ticket_id, modifier_name)),
      onAddEditedOption: (opt, modifier) => dispatch(addEditedOption(opt, modifier)),
      onAddEditedSelectedOption: (opts, modifier) => dispatch(addEditedSelectedOptions(opts, modifier)),
      onDeleteProduct: (ticket_id) => dispatch(deleteProduct(ticket_id)),
      onRedirectToCheckout: () => dispatch(redirectToCheckout()),
      onSaveTicket: () => dispatch(saveTicket()),
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  
  export default compose(
    withConnect,
    memo,
  )(BuyProcessPage);

