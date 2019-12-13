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

import NewProductForm from './../../components/NewProductForm'

import { 
  loadProducts, 
  createProduct, 
  makeFormVisible, } from './actions';
import { 
  makeSelectProducts, 
  makeSelectProduct, 
  makeSelectFormVisibility, 
  makeSelectNewProduct, } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'products';

const Product = ({product}) => {

  const formatType = () => {
    switch (product.price) {
      case 0:
        return "Sin precio"
      default:
        return `$ ${product.price}`
    };
  };

  return(
    <a href={`/PS/ultimate/${product._id}`} style={{color:"black"}}>
      <div className="card" style={{width: '240px', margin:'8px'}}>
        <div class="modal-header">
          <span>{product.name}</span>
          <span>{formatType()}</span>
        </div>
        <div className="card-body">
          {product.modifiers.map(modifier => {
            return(
              <div className="btn btn-dark" style={{margin:"4px"}}>{modifier.name}</div>
            );
          })}
        </div>
      </div>
    </a>
  )
}

export function ProductPage({
  products,
  product,
  formStatus,
  onLoadProducts,
  makeFormVisible,
  onCreateProduct
}) {
  let children;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `${getServerUrl()}/products`;
    try {
      const token = localStorage.getItem("PointOfSaleToken")

      axios.get(requestURL, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(({ data }) => {
        console.log(data.data);
        onLoadProducts(data.data);
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
        <NewProductForm onCreateProduct={onCreateProduct}/>
      </div>
    </div>
  );

  return (
    <div className="container-fluid" style={{padding: '0px'}}>
      <Navbar is_active='product' />
      <Modal is_visible={formStatus.isVisibleCreateProd} children={children} />
      <div className="row justify-content-center">
        <div className="col-6">
          <h1>Productos</h1>
        </div>
        <div className="col-6">
          <div className="btn btn-dark" style={{marginTop: "12px"}} onClick={() => makeFormVisible("createProductForm", true)}>Crear Producto</div>
        </div>
      </div>

      <div className="row">
        <div className="col-12" style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {products.map(product => 
            <Product 
              product={product} 
              makeFormVisible={makeFormVisible}
            />
          )}
        </div>
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  product: makeSelectProduct(),
  formStatus: makeSelectFormVisibility(),
  newProduct: makeSelectNewProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
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
