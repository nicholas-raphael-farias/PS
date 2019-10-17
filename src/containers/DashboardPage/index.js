import React, { memo } from 'react'
import Navbar from '../../components/Navbar'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { changeSignOutState } from './actions';
import { makeSelectIsSigningOut } from './selectors';
import reducer from './reducer';

const key = 'dashboard';

const DashboardPage = () => {

    return (
      <div>
        <Navbar is_active='dashboard' />
      </div>
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
