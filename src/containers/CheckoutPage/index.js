import React, {useEffect, memo} from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Pad from './../../components/Pad'

import { addMoney, cancelIncome, choosePaymentMethod } from './actions';
import { makeSelectPayed, makeSelectTotal, makeSelectChange, makeSelectPaymentMethod } from './selectors';
import reducer from './reducer';
import { isNull } from 'is-what';
const key = 'checkoutPage';


function PaymentMethodForm({onChoosePayment}) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card" style={{marginTop:"calc(50vh - 160px)", marginLeft:'auto', marginRight:'auto', maxWidth:'320px'}}>
          <div className="card-body">
          <h5 class="card-title">Metodo de pago</h5>
          <h6 class="card-subtitle mb-2 text-muted">Escoge el metodo de pago:</h6>
            <div className="btn btn-dark" style={{float:'left'}} onClick={() => { onChoosePayment('cash') }}>Efectivo</div>
            <div className="btn btn-dark" style={{float:'right'}} onClick={() => { onChoosePayment('card') }}>Tarjeta</div>
          </div>
        </div>
      </div>
    </div>
  )
}


function CashCheckoutComponent({onAddMoney, onCancelIncome, payed, total, change}) {
  return (
    <div className="row">
      <Pad onAddMoney={onAddMoney} />
      <div className="col-12 col-md-4">

        <div className="card" style={{maxWidth:'400px', margin: 'auto', marginTop:'40px' }}>
          <div className="card-body">
          <p style={{height:'24px'}}>
            <span style={{float:"left"}}> 
            <span style={{marginRight:"20px", fontWeight:'bold'}}>Pagado:</span> 
              ${payed} <br/>
            </span>
          </p>

          <p style={{height:'24px'}}>
            <span style={{float:"left"}}> 
            <span style={{marginRight:"39px", fontWeight:'bold'}}>Total:</span> 
              ${total} <br/>
            </span>
          </p>
          <p style={{height:'24px'}}>
            {change !== '' ? 
              <span style={{float:"left"}}> 
                <span style={{marginRight:"20px", fontWeight:'bold'}}>Cambio:</span> 
                ${change} <br/>
              </span>
            : null}
          </p>    

          <div className="row">
            <div className="col-12">
              <div onClick={onCancelIncome} className="btn btn-danger" style={{float:'left', width:'inherit', margin:'8px 0'}}>Reiniciar Cobro</div>
            </div>
            <div className="col-12">
              <div className="btn btn-dark" style={{float:'right', width:'inherit', margin:'8px 0 0 0'}}>Cobrar</div>
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}

function CardCheckoutComponent() {
  return (
    <div className="row">
      <div className="col-12">
        <p>FUe pago con tarjeta</p>
      </div>
    </div>
  )
}



export function CheckoutPage({
  payed,
  total,
  change,
  payment_method,
  onAddMoney,
  onCancelIncome,
  onChoosePayment,
}) {

  useInjectReducer({ key, reducer });

  return (
    <div className="container" style={{padding: '0px'}}>

      { isNull(payment_method) ? 
        <PaymentMethodForm onChoosePayment={onChoosePayment}/> : 
        (payment_method === 'cash' ? 
          <CashCheckoutComponent 
            onAddMoney={onAddMoney} 
            onCancelIncome={onCancelIncome} 
            payed={payed} 
            total={total} 
            change={change} /> : 
          <CardCheckoutComponent/>)
      }


    
    </div>
  )
}


CheckoutPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  payed: makeSelectPayed(),
  total: makeSelectTotal(),
  change: makeSelectChange(),
  payment_method: makeSelectPaymentMethod(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddMoney: (amount) => dispatch(addMoney(amount)),
    onCancelIncome: () => dispatch(cancelIncome()),
    onChoosePayment: (payment_method) => dispatch(choosePaymentMethod(payment_method))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(CheckoutPage);

