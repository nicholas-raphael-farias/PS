import React, {useEffect, memo} from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Pad from './../../components/Pad'

import { addMoney, cancelIncome } from './actions';
import { makeSelectPayed, makeSelectTotal, makeSelectChange} from './selectors';
import reducer from './reducer';
const key = 'checkoutPage';

export function CheckoutPage({
  payed,
  total,
  change,
  onAddMoney,
  onCancelIncome,
}) {

  useInjectReducer({ key, reducer });

  return (
    <div className="container-fluid" style={{padding: '0px'}}>
      <div className="row">
        <Pad onAddMoney={onAddMoney} />
        <div className="col-4">
          <p>$ {payed}</p>
          <p>$ {total}</p>
          <p>{change !== "" ? `Cambio: ${change}` : null}</p>
          <div onClick={onCancelIncome} className="btn btn-dark">Reiniciar Cobro</div>
        </div>
      </div>
    </div>
  )
}


CheckoutPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  payed: makeSelectPayed(),
  total: makeSelectTotal(),
  change: makeSelectChange(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddMoney: (amount) => dispatch(addMoney(amount)),
    onCancelIncome: () => dispatch(cancelIncome()),
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

