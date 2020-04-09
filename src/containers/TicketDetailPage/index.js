import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import TableTickets from '../../components/TableTickets'
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

import { loadTicket } from './actions';
import { makeSelectParam } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'ticket_detail';

registerLocale('es', es)


export function TicketsPage({
  ticket,
  match,
  onLoadTicket,
}) {

  useInjectReducer({ key, reducer });
  //useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/tickets/${match.params.ticketId}`;

    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        onLoadTicket(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }




  }, []);

  return (
    <div>
      <Navbar is_active='tickets'/>

      <h1>TICKET DETAIL</h1>
      <p>${ticket._id}</p>
    </div>
  )
}

TicketsPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
  ticket: makeSelectParam('ticket'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTicket: (ticket) => dispatch(loadTicket(ticket)),
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