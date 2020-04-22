import React, { memo, useState } from 'react'
//import Navbar from '../../components/Navbar'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { changeSignOutState } from './actions';
import { makeSelectIsSigningOut } from './selectors';
import reducer from './reducer';
import ContainerWrapper from './../../components/ContainerWrapper';

const key = 'dashboard';

const DashboardPage = () => {
    return(
      <ContainerWrapper active_page={key}>
      </ContainerWrapper>
    )
  }

  DashboardPage.propTypes = {
  };


const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(DashboardPage);
