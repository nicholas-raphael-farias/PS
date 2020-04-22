import React, {useEffect, memo} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getServerUrl } from './../../utils/serverURL';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';

import './css/datatables.css';
import './css/dt-global_style.css';
import './css/notes.css';

import ContainerWrapper from './../../components/ContainerWrapper';

import NewProductForm from './../../components/NewProductForm'

import {
  loadCategories,
  loadProducts, 
  createProduct, 
  makeFormVisible, } from './actions';
import {
  makeSelectCategories, 
  makeSelectProducts, 
  makeSelectProduct, 
  makeSelectFormVisibility, 
  makeSelectNewProduct, } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'products';

const Product = ({product}) => {

  const formatModifiers = () => {
    if(product.modifiers.length === 0){
      return "Sin modificadores"
    } else {
      return "Tiene modificadores"
    }
  };

  const formatType = () => {
    switch (product.price) {
      case 0:
        return "Sin precio"
      default:
        return `Precio: $ ${product.price}`
    };
  };

  const formatDate = (unix) => {
    const date = new Date(unix)
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();
  
    return [
      (dd>9 ? '' : '0') + dd,'/',
      (mm>9 ? '' : '0') + mm,,'/',
      date.getFullYear()].join('');
  }

  return(
    <a href={`/PS/ultimate/${product._id}`}>
    <div class={`note-item all-notes ${product.modifiers.length === 0 ? null : "note-with-modifiers"}`}>
    <div class="note-inner-content" style={{cursor:"pointer"}}>
        <div class="note-content">
            <p class="note-title" data-noteTitle="Meeting Scheduled at 4:50pm">{product.name}</p>
            <p class="meta-time">Fecha de creacion: { formatDate(product.created_at)}</p>
            <div class="note-description-content">
              <p class="note-description" data-noteDescription="Excepteur sint occaecat cupidatat non proident.">{formatModifiers()}</p>
            </div>
            <div class="note-description-content">
              <p class="note-description" data-noteDescription="Excepteur sint occaecat cupidatat non proident.">{product.category}</p>
            </div>
            <div class="note-description-content">
                <p class="note-description" data-noteDescription="Excepteur sint occaecat cupidatat non proident.">{formatType()}</p>
            </div>
        </div>
        <div class="note-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fav-note"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 delete-note"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </div>
        <div class="note-footer">
            <div class="tags-selector btn-group">
                <a class="nav-link dropdown-toggle d-icon label-group" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                    <div class="tags">
                        <div class="g-dot-personal"></div>
                        <div class="g-dot-work"></div>
                        <div class="g-dot-social"></div>
                        <div class="g-dot-important"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right d-icon-menu">
                    <a class="note-personal label-group-item label-personal dropdown-item position-relative g-dot-personal" href="javascript:void(0);"> Personal</a>
                    <a class="note-work label-group-item label-work dropdown-item position-relative g-dot-work" href="javascript:void(0);"> Work</a>
                    <a class="note-social label-group-item label-social dropdown-item position-relative g-dot-social" href="javascript:void(0);"> Social</a>
                    <a class="note-important label-group-item label-important dropdown-item position-relative g-dot-important" href="javascript:void(0);"> Important</a>
                </div>
            </div>
        </div>
    </div>
</div>
</a>
  )
}

export function ProductPage({
  categories,
  products,
  product,
  formStatus,
  onLoadCategories,
  onLoadProducts,
  makeFormVisible,
  onCreateProduct
}) {
  let children;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestCatURL = `${getServerUrl()}/categories`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestCatURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        console.log(data);
        onLoadCategories(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }


    const requestProdURL = `${getServerUrl()}/products`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestProdURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        console.log(data);
        onLoadProducts(data);
      });

    } catch (err) {
      console.log("err")
      console.log(err)
    }

  }, []);

  children =(
    <div className="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Crear Producto</h5>
        <button type="button" class="close" onClick={() => makeFormVisible("createProductForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <NewProductForm categories={categories} onCreateProduct={onCreateProduct}/>
      </div>
    </div>
  );

  return (
    <ContainerWrapper active_page={'productos'}>
    <Modal is_visible={formStatus.isVisibleCreateProd} children={children} />
    <div id="content" class="main-content">
            <div class="layout-px-spacing">


                <div className="row">
                  <div className="col-12" style={{marginTop:"24px"}}>
                    <div className="btn btn-primary" style={{float:"right"}} onClick={() => makeFormVisible("createProductForm", true)}>
                      Crear Producto
                    </div>
                  </div>
                </div>
                
                <div class="row app-notes layout-top-spacing" id="cancel-row">
                    <div class="col-lg-12">
                    
                        <div class="app-container">
                            
                            <div class="app-note-container">

                                <div class="app-note-overlay"></div>

                                <div id="ct" class="note-container note-grid">

                                {products.map(product => 
                                  <Product 
                                    product={product} 
                                    makeFormVisible={makeFormVisible}
                                  />
                                )}

                                </div>

                            </div>
                            
                        </div>
                      
                    </div>
                </div>

                </div>
        </div>
    </ContainerWrapper>
  );
}

ProductPage.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  products: makeSelectProducts(),
  product: makeSelectProduct(),
  formStatus: makeSelectFormVisibility(),
  newProduct: makeSelectNewProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadCategories: (categories) => dispatch(loadCategories(categories)),
    onLoadProducts: (products) => dispatch(loadProducts(products)),
    makeFormVisible: (form, visibility) => dispatch(makeFormVisible(form, visibility)),
    onCreateProduct: (product) => dispatch(createProduct(product)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(ProductPage);
