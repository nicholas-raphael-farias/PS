import React, {useEffect, memo} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';

import { loadProducts, saveProduct, makeFormVisible, changeProduct } from './actions';
import { makeSelectProducts, makeSelectProduct, makeSelectFormVisibility, makeSelectNewProduct } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'products';

const Product = ({product}) => {

  return(
    <a href={`/ultimate/${product._id}`}>
      <div className="card" style={{width: '240px', margin:'8px', height:'240px'}}>
        <span>{product.name}</span>
        <span>{product.price}</span>
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

const ProductForm = ({product, onChangeProduct, onSaveProduct, makeFormVisible}) => {
  return(
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Crear Producto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => makeFormVisible("createProductForm", false)}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="form-group">
        <label for="exampleInputEmail1">Nombre del Producto</label>
        <input 
          type="text" 
          class="form-control" 
          placeholder="Nombre del Producto" 
          value={product.name} 
          onChange={(evt) => onChangeProduct("name", evt.target.value)}/>
      </div>
      <div class="form-check">
        <input
          type="checkbox" 
          class="form-check-input" 
          checked={product.hasPrice}
          onChange={(evt) => onChangeProduct("hasPrice", evt.target.checked)}/>
        <label class="form-check-label" for="defaultCheck1">
          Tiene precio?
        </label>
      </div>
      {product.hasPrice ?  
        <div class="form-group">
          <label for="exampleInputEmail1">Precio del producto</label>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Precio" 
            value={product.price} 
            onChange={(evt) => onChangeProduct("price", evt.target.value)}/>
          
        </div> 
        : null}
      <div 
        className="btn btn-dark" 
        style={{marginTop: "8px"}}
        onClick={onSaveProduct}>
          Crear Producto
      </div>
    </div>
    </div>
  );
}


export function ProductPage({
  products,
  product,
  formStatus,
  onLoadProducts,
  makeFormVisible,
  onChangeProduct,
  onSaveProduct
}) {
  let children;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {

    const requestURL = `http://localhost:3030/products`;
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
    <ProductForm 
      product={product} 
      onChangeProduct={onChangeProduct} 
      onSaveProduct={onSaveProduct}
      makeFormVisible={makeFormVisible} />
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
    onChangeProduct: (property, value) => dispatch(changeProduct(property, value)),
    onSaveProduct: () => dispatch(saveProduct()),
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
