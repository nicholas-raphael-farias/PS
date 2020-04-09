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

import { loadPromos, changeValue, changeNewPromoValue, savePromo, deletePromo, selectPromo } from './actions';
import { makeSelectParam, makeSelectNewPromo } from './selectors';

import TablePromos from './../../components/TablePromos'

import reducer from './reducer';
import saga from './saga';

const key = 'promos';

registerLocale('es', es)


const NewPromoForm =({new_promo, products, onChangeNpValue, onSavePromo}) => {
  return (
    <div className="row justify-content-center" style={{marginTop:'5vh'}}>
      <div className="col-4 card">
        <div className="card-body" style={{textAlign:'left'}}>


          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Tipo de promocion</label>
            <select className="form-control" name='type' value={new_promo.type} onChange={onChangeNpValue}>
              <option value='1'>Descuento</option>
              <option value='2'>2x1</option>
              <option value='3'>3x1</option>
            </select>
          </div>


          <div className="form-group">
            <label>Porcentaje</label>
            <input type="text" className="form-control" placeholder="Porcentaje" value={new_promo.porcentage} name='porcentage' onChange={onChangeNpValue}/>
          </div>
         
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">Producto</label>
            <select className="form-control" name='product' value={new_promo.product} onChange={onChangeNpValue}>
              <option value='' selected>Seleccionar Producto</option>
              {products.map((product) =>  <option value={product._id}> {product.name} </option> )}
            </select>
          </div>

          <div className="form-group">
            <label>Fecha de Expiracion</label> <br/>
            <DatePicker
              locale="es"
              className="form-control"
              selected={new Date(new_promo.expiration_date)}
              name='expiration_date'
              onSelect={(value) => {onChangeNpValue({target:{value: value, name:'expiration_date'}}) }}
              showMonthDropdown
              showYearDropdown
            />
          </div>
          <div className="btn btn-dark" onClick={(onSavePromo)}>
            Crear
          </div>
        </div>
      </div>
    </div>
  );
}
export function PromosPage({
  promos,
  new_promo,
  products,
  is_visible_crt_modal,
  onLoadPromos,
  onChangeValue,
  onChangeNpValue,
  onSavePromo,
  onDeletePromo,
  onSelectPromo,
}) {

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/promos`;
    const requestURL2 = `${getServerUrl()}/products`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        onLoadPromos(data);
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
          onChangeValue({name:'products', value:data.data});
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  }, []);

  return (
    <div>
      <Navbar is_active='promos'/>
      <div style={{position:'absolute', top:'64px', right:'320px'}}>
      <div className="btn btn-dark" onClick={() => {onChangeValue({name:'is_visible_crt_modal', value: true})}}>Crear promocion</div>
      </div>
      
      <div style={{position:'absolute', top:'64px', right:'8px', width:'240px'}}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><Img src={Banner} alt="desc" style={{width:'16px', heigth: '100%'}}/></span>
            </div>
            <input type="text" className="form-control" placeholder="Buscar" value='' />
          </div>
      </div>

      {is_visible_crt_modal ? 
        <NewPromoForm  
          new_promo={new_promo} 
          products={products} 
          onChangeNpValue={onChangeNpValue}
          onSavePromo={onSavePromo}/> : 
        <TablePromos promos={promos} products={products} onSelectPromo={onSelectPromo} onDeletePromo={onDeletePromo}/> }
      
    </div>
  )
}

PromosPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
  promos: makeSelectParam('promos'),
  new_promo: makeSelectNewPromo(),
  products: makeSelectParam('products'), 
  is_visible_crt_modal: makeSelectParam('is_visible_crt_modal'),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadPromos: (promos) => dispatch(loadPromos(promos)),
    onChangeValue: (evt) => dispatch(changeValue(evt)),
    onChangeNpValue: (evt) => dispatch(changeNewPromoValue(evt)),
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