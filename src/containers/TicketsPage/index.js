import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import TableTickets from '../../components/TableTickets'
import Banner from './Search.svg';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';

import PropTypes from 'prop-types';

import ContainerWrapper from './../../components/ContainerWrapper';

import { getServerUrl } from '../../utils/serverURL';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import { loadTickets, selectTicket, requestTcktCancel } from './actions';
import { makeSelectParam } from './selectors';

import reducer from './reducer';
import saga from './saga';

import './css/datatables.css';
import './css/dt-global_style.css';

const key = 'tickets';

registerLocale('es', es)


export function TicketsPage({
  tickets,
  selected_ticker,
  onLoadTickets,
  onSelectTicket,
  onRequestTicketCancell,
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

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
    <ContainerWrapper active_page={'tickets'}>

      <div id="content">
      <div class="layout-px-spacing">
        <div class="row layout-top-spacing" id="cancel-row">


        <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <div class="widget-content widget-content-area br-6">
            <div class="table-responsive mb-4 mt-4">
              <div id="zero-config_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="dataTables_length" id="zero-config_length">
                      {/* To keep the button on the left */}
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div id="zero-config_filter" class="dataTables_filter">
                      <label><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <button class="btn btn-primary mb-2">Boton</button>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12"><table id="zero-config" class="table table-hover dataTable" style={{width:'100%'}} role="grid" aria-describedby="zero-config_info">
                  <thead>
                      <tr role="row">
                        <th tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width:"86px"}}>ID</th>
                        <th tabindex="1" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style={{width:"86px"}}>Tipo de pago</th>
                        <th tabindex="2" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style={{width:"86px"}}>Cliente</th>
                        <th tabindex="3" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width:"86px"}}>Creado en</th>
                        <th tabindex="4" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style={{width:"86px"}}>Total</th>
                        <th tabindex="4" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style={{width:"86px"}}>Estado</th>
                        <th tabindex="5" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style={{width:"86px"}}>Acciones</th>
                        <th class="no-content sorting" tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style={{width:"48px"}}></th>
                        </tr>
                  </thead>
                  <tbody>
                    {tickets.map(e => {
                        return(
                          <tr role="row">
                          <td class="sorting_1">{e._id}</td>
                          <td style={{border:"none"}}>{e.tipo_de_pago}</td>
                          <td style={{border:"none"}}>{e.id_participante === null ? "SIN" : null}</td>
                          <td style={{border:"none"}}>{typeof(e.hora_creacion) === 'object' ? e.hora_creacion.toLocaleDateString("es-MX") : new Date(e.hora_creacion).toLocaleDateString() }</td>
                          <td style={{border:"none"}}>{e.total}</td>
                          <td style={{border:"none"}}>{e.status}</td>

                          <td>
                            <svg onClick={() => { 
                            onSelectTicket(e._id);
                            onRequestTicketCancell();
                            }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            
                            <a href={`/PS/tickets/${e._id}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            </a>

                            <a href={`http://localhost:3030/pdfs/${e._id}`} target="_blank">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-pdf"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </a>
                          </td>
                        </tr>
                        );
                      })
                    }

                </tbody>
                  <tfoot>
                      <tr>
                        <th rowspan="1" colspan="1">ID</th>
                        <th rowspan="1" colspan="1">Tipo de pago</th>
                        <th rowspan="1" colspan="1">Cliente</th>
                        <th rowspan="1" colspan="1">Creado en</th>
                        <th rowspan="1" colspan="1">Total</th>
                        <th rowspan="1" colspan="1">Acciones</th>
                        <th rowspan="1" colspan="1"></th>
                      </tr>
                  </tfoot>
              </table></div></div>
              </div>
            </div>
          </div>
        </div>







        </div>
      </div>
      </div>
    </ContainerWrapper>
  )
}

TicketsPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
  tickets: makeSelectParam('tickets'),
  selected_ticker: makeSelectParam('selected_tck_id'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTickets: (tickets) => dispatch(loadTickets(tickets)),
    onSelectTicket: (ticket_id) => dispatch(selectTicket(ticket_id)),
    onRequestTicketCancell: () => dispatch(requestTcktCancel()),
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