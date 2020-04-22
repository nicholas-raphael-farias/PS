import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';

import ContainerWrapper from './../../components/ContainerWrapper';

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


import './css/datatables.css';
import './css/dt-global_style.css';
import './css/invoice.css';

const key = 'ticket_detail';

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
    <ContainerWrapper active_page={'tickets'}>
      
      <div id="content" class="main-content">
            <div class="layout-px-spacing">
                <div class="row invoice layout-top-spacing">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="doc-container">
                            <div class="tab-title">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-12">
                                        <div class="search">
                                            <input type="text" class="form-control" placeholder="Search"/>
                                        </div>
                                        <ul class="nav nav-pills inv-list-container d-block" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00001" data-invoice-id="00001">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00001</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Jesse Cory</p>
                                                            <p class="invoice-generated-date">Date: 12 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00002" data-invoice-id="00002">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00002</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Linda Nelson</p>
                                                            <p class="invoice-generated-date">Date: 13 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00003" data-invoice-id="00003">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00003</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Andy King</p>
                                                            <p class="invoice-generated-date">Date: 13 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00004" data-invoice-id="00004">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00004</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Luke Ivory</p>
                                                            <p class="invoice-generated-date">Date: 13 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00005" data-invoice-id="00005">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00005</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Susan Phillips</p>
                                                            <p class="invoice-generated-date">Date: 14 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00006" data-invoice-id="00006">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00006</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Thomas Granger</p>
                                                            <p class="invoice-generated-date">Date: 15 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00007" data-invoice-id="00007">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00007</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Donna Rogers</p>
                                                            <p class="invoice-generated-date">Date: 16 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00008" data-invoice-id="00008">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00008</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Angie Lamb</p>
                                                            <p class="invoice-generated-date">Date: 17 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00009" data-invoice-id="00009">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00009</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Mary Mcdonald</p>
                                                            <p class="invoice-generated-date">Date: 17 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00010" data-invoice-id="00010">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00010</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Thomas Granger</p>
                                                            <p class="invoice-generated-date">Date: 18 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00011" data-invoice-id="00011">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00011</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Sonia Shaw</p>
                                                            <p class="invoice-generated-date">Date: 19 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00012" data-invoice-id="00012">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00012</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Laurie Fox</p>
                                                            <p class="invoice-generated-date">Date: 19 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00013" data-invoice-id="00013">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00013</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Ryan McKillop</p>
                                                            <p class="invoice-generated-date">Date: 19 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00014" data-invoice-id="00014">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00014</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Jimmy Turner</p>
                                                            <p class="invoice-generated-date">Date: 20 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="nav-item">
                                                <div class="nav-link list-actions" id="invoice-00015" data-invoice-id="00015">
                                                    <div class="f-m-body">
                                                        <div class="f-head">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                                        </div>
                                                        <div class="f-body">
                                                            <p class="invoice-number">Invoice #00015</p>
                                                            <p class="invoice-customer-name"><span>To:</span> Roxanne</p>
                                                            <p class="invoice-generated-date">Date: 20 Apr 2019</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="invoice-container">
                                <div class="invoice-inbox ps" style={{height: "calc(-168px + 100vh)"}}>

                                  <div class="inv-not-selected" style={{display:"none"}}>
                                      <p>Open an invoice from the list.</p>
                                  </div>

                                    <div class="invoice-header-section">
                                        <h4 class="inv-number"></h4>
                                        <div class="invoice-action">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer action-print" data-toggle="tooltip" data-placement="top" data-original-title="Reply"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                        </div>
                                    </div>
                                    
                                    <div id="ct" class="" style={{display:"block"}}>
                                        
                                        <div class="invoice-00001" style={{overflowY:"scroll"}}>
                                            <div class="content-section  animated animatedFadeInUp fadeInUp">

                                                <div class="row inv--head-section">

                                                    <div class="col-sm-6 col-12">
                                                        <h3 class="in-heading">TICKET</h3>
                                                    </div>
                                                    <div class="col-sm-6 col-12 align-self-center text-sm-right">
                                                        <div class="company-info">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-hexagon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                                                            <h5 class="inv-brand-name">BUBBLE TOWN</h5>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div class="row inv--detail-section">

                                                    <div class="col-sm-7 align-self-center">
                                                        <p class="inv-to">Cliente</p>
                                                    </div>
                                                    <div class="col-sm-5 align-self-center  text-sm-right order-sm-0 order-1">
                                                        <p class="inv-detail-title">Status: {ticket.status} </p>
                                                    </div>
                                                    
                                                    <div class="col-sm-7 align-self-center">
                                                        <p class="inv-customer-name">Cliente A</p>
                                                        <p class="inv-street-addr">ID Cliente: 38d83900</p>
                                                        <p class="inv-email-address">cleintea@gmail.com</p>
                                                    </div>
                                                    <div class="col-sm-5 align-self-center  text-sm-right order-2">
                                                        <p class="inv-list-number"><span class="inv-title">ID Ticket : </span> <span class="inv-number">[{ticket._id}]</span></p>
                                                        <p class="inv-created-date"><span class="inv-title">Tipo de pago : </span> <span class="inv-date">{ticket.tipo_de_pago === "cash" ? "Efectivo" : "Tarjeta"} </span></p>
                                                        <p class="inv-due-date"><span class="inv-title">Creado en : </span> <span class="inv-date"> {typeof(ticket.hora_creacion) === 'object' ? ticket.hora_creacion.toLocaleDateString("es-MX") : new Date(ticket.hora_creacion).toLocaleDateString() } </span></p>
                                                    </div>
                                                </div>

                                                <div class="row inv--product-table-section">
                                                    <div class="col-12">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead class="">
                                                                    <tr>
                                                                        <th scope="col">producto</th>
                                                                        <th scope="col">Nombre</th>
                                                                        <th scope="col">Cantidad</th>
                                                                        <th scope="col">Modificadores</th>
                                                                        <th scope="col">Precio</th>
                                                                        <th scope="col">Acciones</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    
                                                                      {ticket.productos.map(producto => {

                                                                        let initial_price = 0;

                                                                        if(producto.hasOwnProperty('price'))
                                                                          initial_price = parseInt(producto.price)


                                                                        const total = producto.modifiers.reduce((acc, modifier) => {

                                                                          const option_total = modifier.options.reduce((acc_opc, opc) => {
                                                                            acc_opc = acc_opc + parseInt(opc.price);
                                                                            return acc_opc;
                                                                    
                                                                          }, 0);
                                                                          acc = acc + option_total;

                                                                          return acc;

                                                                        }, initial_price );

                                                                        return(
                                                                          <tr>
                                                                            <td>{producto._id}</td>
                                                                            <td>{producto.name}</td>
                                                                            <td class="text-right">1</td>
                                                                        <td class="text-right">{producto.modifiers.length}</td>
                                                                        <td class="text-right">${total}</td>
                                                                        <td>
                                                                          <svg onClick={() => { 
                                                                          }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                                                        </td>
                                                                          </tr>
                                                                        )
                                                                      })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <div class="col-sm-5 col-12 order-sm-0 order-1">
                                                    </div>
                                                    <div class="col-sm-7 col-12 order-sm-1 order-0">
                                                        <div class="inv--total-amounts text-sm-right">
                                                            <div class="row">
                                                                <div class="col-sm-8 col-7">
                                                                    <p class="">Sub Total: </p>
                                                                </div>
                                                                <div class="col-sm-4 col-5">
                                                                    <p class="">${ticket.subtotal}</p>
                                                                </div>
                                                                <div class="col-sm-8 col-7">
                                                                    <p class="">IVA: </p>
                                                                </div>
                                                                <div class="col-sm-4 col-5">
                                                                    <p class="">${ticket.iva}</p>
                                                                </div>
                                                                <div class="col-sm-8 col-7">
                                                                    <p class=" discount-rate">Descuento : <span class="discount-percentage">5%</span> </p>
                                                                </div>
                                                                <div class="col-sm-4 col-5">
                                                                    <p class="">$700</p>
                                                                </div>
                                                                <div class="col-sm-8 col-7 grand-total-title">
                                                                    <h4 class="">Total : </h4>
                                                                </div>
                                                                <div class="col-sm-4 col-5 grand-total-amount">
                                                                    <h4 class="">${ticket.total}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div> 


                                    </div>
                                </div>


                                </div>

                                <div class="inv--thankYou">
                                    <div class="row">
                                        <div class="col-sm-12 col-12">
                                            <p class="">Thank you for doing Business with us.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                    </div>
                </div>
                </div>
        <div class="footer-wrapper">
                <div class="footer-section f-section-1">
                    <p class="">Copyright © 2020 <a target="_blank" href="https://designreset.com">DesignReset</a>, All rights reserved.</p>
                </div>
                <div class="footer-section f-section-2">
                    <p class="">Coded with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></p>
                </div>
            </div>
        </div>


    </ContainerWrapper>
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