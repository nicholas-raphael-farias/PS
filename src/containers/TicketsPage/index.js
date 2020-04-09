import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import TableTickets from '../../components/TableTickets'
import Banner from './Search.svg';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

import PropTypes from 'prop-types';

import { getServerUrl } from '../../utils/serverURL';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import { loadTickets } from './actions';
import { makeSelectParam } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'tickets';

registerLocale('es', es)


export function TicketsPage({
  tickets,
  onLoadTickets,
}) {

  useInjectReducer({ key, reducer });
  //useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/tickets`;

    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        onLoadTickets(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }


  }, []);

  return (
    <div>
      <Navbar is_active='tickets'/>

      <TableTickets tickets={tickets}/>
    </div>
  )
}

TicketsPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
  tickets: makeSelectParam('tickets'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTickets: (tickets) => dispatch(loadTickets(tickets)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(TicketsPage);