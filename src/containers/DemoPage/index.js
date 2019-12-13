import React, { memo } from 'react'
import Navbar from '../../components/Navbar'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addToNumber } from './actions';
import { makeSelectNumber } from './selectors';
import reducer from './reducer';
import { useInjectReducer } from './../../utils/injectReducer';

const key = 'demo';

const DemoPage = ({number, onAddToNumber}) => {

  useInjectReducer({ key, reducer });

    return (
      <div>
        <h1>Demo {number}</h1>
        <div className="btn" onClick={() => onAddToNumber(Math.random() * 10)}>Agregar Numero</div>
      </div>
    )
}

DemoPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  number: makeSelectNumber(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onAddToNumber: (n) => dispatch(addToNumber(n)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DemoPage);