import React, { memo, useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import Img from '../../components/Img'
import Table from '../../components/Table'
import Banner from './Search.svg';
import DatePicker from "react-datepicker";
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

import { loadPromos, changeValue, changeNewPromo, savePromo, deletePromo, selectPromo } from './actions';
import { makeSelectParam, makeSelectNewPromo } from './selectors';

import NewPromoForm from './../../components/NewPromoForm';
import ContainerWrapper from './../../components/ContainerWrapper';
import Modal from '../../components/Modal';

import reducer from './reducer';
import saga from './saga';

import './css/datatables.css';
import './css/dt-global_style.css';

const key = 'promos';

export function PromosPage({
  categories,
  promos,
  new_promo,
  products,
  is_visible_crt_modal,
  onLoadPromos,
  onChangeValue,
  onChangeNp,
  onSavePromo,
  onDeletePromo,
  onSelectPromo,
}) {

  let children;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/promos`;
    const requestURL2 = `${getServerUrl()}/products`;
    const requestURL3 = `${getServerUrl()}/categories`;

    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        onLoadPromos(data);
        console.log(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }


    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL2, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
          console.log(data)
          onChangeValue({name:'products', value:data});
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }


    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL3, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
          console.log(data)
          onChangeValue({name:'categories', value:data});
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  }, []);



  children = (
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Promocion</h5>
        <button type="button" class="close" onClick={() => {onChangeValue({name:'is_visible_crt_modal', value: false})}}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewPromoForm  
          categories={categories}
          products={products} 
          onChangeNp={onChangeNp}
          onSavePromo={onSavePromo}/>
      </div>
    </div>
  );

  return (
    <ContainerWrapper active_page={'promociones'}>


    <Modal is_visible={is_visible_crt_modal} children={children} />



    <div id="content">
      <div className="layout-px-spacing">
        <div className="row layout-top-spacing">



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
                                  <button class="btn btn-primary mb-2" onClick={() => {onChangeValue({name:'is_visible_crt_modal', value: true})}}>Crear Promocion</button>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-sm-12"><table id="zero-config" class="table table-hover dataTable" style={{width:'100%'}} role="grid" aria-describedby="zero-config_info">
                            <thead>
                                <tr role="row">
                                  <th tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width:"86px"}}>ID</th>
                                  <th tabindex="1" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style={{width:"86px"}}>Tipo</th>
                                  <th tabindex="2" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style={{width:"86px"}}>Efecto en</th>
                                  <th tabindex="3" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width:"86px"}}>Afecta a</th>
                                  <th tabindex="3" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style={{width:"86px"}}>Valor</th>
                                  <th tabindex="4" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style={{width:"86px"}}>Fecha de expiracion</th>
                                  <th tabindex="6" aria-controls="zero-config" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style={{width:"86px"}}>Acciones</th>
                                  <th class="no-content sorting" tabindex="0" aria-controls="zero-config" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style={{width:"48px"}}></th>
                                  </tr>
                            </thead>
                            <tbody>
                              {promos.map( promo => {
                                let product_name = products.filter(p => p._id == promo.producto);
                                  return(
                                    <tr role="row">
                                    <td class="sorting_1">{promo._id}</td>
                                    <td style={{border:"none"}}>{promo.target === "product" ? "producto" : "categoria"}</td>
                                    <td style={{border:"none"}}>{promo.type === "porcentage" ? "porcentaje" : "precio"}</td>
                                    <td style={{border:"none"}}>{promo.target_value}</td>
                                    <td style={{border:"none"}}>{promo.type === "porcentage" ? `${promo.value}%` : `$${promo.value}`}</td>
                                    <td style={{border:"none"}}>{typeof(promo.fecha_expiracion) === 'object' ? promo.expiration_date.toLocaleDateString("es-MX") : new Date(promo.expiration_date).toLocaleDateString() }</td>
                                    
                                    <td>
                                      <svg onClick={() => { 
                                        onSelectPromo(promo._id);
                                        onDeletePromo();
                                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                      <svg onClick={() => {
                                   
                                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </td>
                                  </tr>
                                  );
                                })
                              }
  
                         </tbody>
                            <tfoot>
                                <tr>
                                  <th rowspan="1" colspan="1">ID</th>
                                  <th rowspan="1" colspan="1">Tipo</th>
                                  <th rowspan="1" colspan="1">Efecto en</th>
                                  <th rowspan="1" colspan="1">Afecta a</th>
                                  <th rowspan="1" colspan="1">Valor</th>
                                  <th rowspan="1" colspan="1">Fecha de expiracion</th>
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

PromosPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
  categories: makeSelectParam('categories'),
  promos: makeSelectParam('promos'),
  new_promo: makeSelectNewPromo(),
  products: makeSelectParam('products'), 
  is_visible_crt_modal: makeSelectParam('is_visible_crt_modal'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadPromos: (promos) => dispatch(loadPromos(promos)),
    onChangeValue: (evt) => dispatch(changeValue(evt)),
    onChangeNp: (new_promo) => dispatch(changeNewPromo(new_promo)),
    onSavePromo: () => dispatch(savePromo()),
    onDeletePromo: () => dispatch(deletePromo()),
    onSelectPromo: (id) => dispatch(selectPromo(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(PromosPage);