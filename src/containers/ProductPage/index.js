import React, {useEffect, memo} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';
import Navbar from '../../components/Navbar';

import { createModifier, saveProduct, loadProducts, makeFormVisible, changeProduct, changeMod, changeCategory, saveCategory } from './actions';
import { makeSelectProducts, makeSelectFormVisibility, makeSelectNewProduct, makeSelectNewMod, makeSelectNewCategory, makeSelectSelectedProduct } from './selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'products';

const Product = ({name, modifier, makeFormVisible}) => {

  const formatType = (type) => {
    switch (type) {
      case "0":
        return "Opcional"
      case "1":
        return "Obligatorio"
      case "2":
        return "Seleccion multiple"
      default:
        break;
    }
  };

  return(
    <div className="card" style={{width: '18rem', margin:'8px', display:'inline-block'}}>
      <div className="card-body">
        <h5 className="card-title">{modifier.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Tipo: {formatType(modifier.type)}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Producto: {name}</h6>

        {modifier.options.map(option => {
          return(
            <div className="btn btn-dark" style={{width: "100%", margin:"4px"}}>{option.name}</div>
          );
        })}
      
        <div className="btn btn-primary" style={{width:'100%', marginTop:'24px'}} onClick={() => makeFormVisible("createCatForm", true)}>+</div>
      </div>
    </div>
  )
}

const ProductList = ({products, makeFormVisible, onChangePrdct}) => {
  return(
    <div class="input-group mb-3" style={{marginTop:'8px', padding:'0 20px'}}>
      <select class="custom-select" onChange={(evt) => onChangePrdct("mod", evt.target.value)} >
        <option selected value="noProduct">Lista de Productos</option>
        {products.map(product => (<option value={product._id}>{product.name}</option>))}
      </select>
      <div class="input-group-append">
        <label class="input-group-text" onClick={() => makeFormVisible("createProductForm", true)}> Agregar </label>
      </div>
    </div>
  );
}

const CreateProduct = ({name, price, onChangePrdct, makeFormVisible, onSaveProduct}) => {
  return(
    <div class="card" style={{width: "320px", textAlign:"left"}}>
      <div className="close" style={{position:"absolute", top:"8px", right:"16px", cursor:"pointer"}} onClick={() => makeFormVisible("createProductForm", false)}>
        <span aria-hidden="true" >&times;</span>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleInputEmail1">Nombre del Producto</label>
          <input type="text" class="form-control" placeholder="Nombre del Producto" value={name} onChange={(evt) => onChangePrdct("name", evt.target.value)} />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Precio del producto</label>
          <input type="text" class="form-control" placeholder="Precio" value={price} onChange={(evt) => onChangePrdct("price", evt.target.value)} />
        </div>
        <div className="btn btn-dark" style={{width:"100%"}} onClick={onSaveProduct}>Crear</div>
      </div>
    </div>
  );
}

const CreateModifier = ({makeFormVisible, onChangeMod, newMod}) => {
  return(
    <div class="card" style={{width: "320px", textAlign:"left"}}>
      <div className="close" style={{position:"absolute", top:"8px", right:"16px", cursor:"pointer"}} onClick={() => makeFormVisible("createModifierForm", false)}>
        <span aria-hidden="true" >&times;</span>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleInputEmail1">Nombre</label>
          <input type="text" class="form-control" placeholder="Nombre del Modificador" value={newMod.name} onChange={(evt) => onChangeMod("name", evt.target.value)} />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Precio</label>
          <input type="text" class="form-control" placeholder="Precio" value={newMod.price} onChange={(evt) => onChangeMod("price", evt.target.value)}/>
        </div>
        <div className="btn btn-dark" style={{width:"100%"}}>Crear</div>
      </div>
    </div>
  );
};

const CreateModifierButton = ({makeFormVisible}) => {
  return(
    <div class="input-group" style={{marginTop:'8px', padding:'0 20px'}}>
      <div className="btn btn-dark" style={{width:"480px"}} onClick={() => makeFormVisible("createCatForm", true)}>
        Crear Modificador
      </div>
    </div>
  );
};


const CreateCategory = ({makeFormVisible, newCat, onChangeCat, onSaveCategory}) => {
  return(
    <div class="card" style={{width: "320px", textAlign:"left"}}>
      <div className="close" style={{position:"absolute", top:"8px", right:"16px", cursor:"pointer"}}  onClick={() => makeFormVisible("createCatForm", false)}>
        <span aria-hidden="true" >&times;</span>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" class="form-control" placeholder="Nombre de la categoria" value={newCat.name} onChange={(evt) => onChangeCat("name", evt.target.value)} />
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <select class="custom-select" onChange={(evt) => onChangeCat("type", evt.target.value)}>
            <option selected>Tipos de Modificador</option>
            <option value="0">Opcional</option>
            <option value="1">Obligatorio</option>
            <option value="2">Seleccion Multiple</option>
          </select>
        </div>
        <div className="btn btn-dark" style={{width:"100%"}} onClick={onSaveCategory}>Crear</div>
      </div>
    </div>
  );
}



export function ProductPage({
  products,
  formStatus,
  newProduct,
  newMod,
  newCat,
  selected,
  onLoadProducts,
  makeFormVisible,
  onChangePrdct,
  onChangeMod,
  onChangeCat,
  onSaveProduct,
  onSaveCategory
}) {

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


  return (
    <div className="container-fluid" style={{padding: '0px'}}>
      <Navbar is_active='product' />
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <h1>Productos</h1>
        </div>
        <div className="col-12 col-md-5">
          <ProductList products={products} makeFormVisible={makeFormVisible} onChangePrdct={onChangePrdct} />
          {formStatus.isVisibleCreateModBtn ? <CreateModifierButton makeFormVisible={makeFormVisible} /> : null}
        </div>
      </div>
      <div className="row justify-content-center">
        { formStatus.isVisibleCreateProd ? <CreateProduct name={newProduct.name} price={newProduct.price} onChangePrdct={onChangePrdct} makeFormVisible={makeFormVisible} onSaveProduct={onSaveProduct} /> : null }
      </div>
      <div className="row justify-content-center">
        { formStatus.isVisibleCreateMod ? <CreateModifier makeFormVisible={makeFormVisible} newMod={newMod} onChangeMod={onChangeMod}  /> : null }
      </div>
      <div className="row justify-content-center">
        { formStatus.isVisibleCreateCat ? <CreateCategory makeFormVisible={makeFormVisible} newCat={newCat} onChangeCat={onChangeCat} onSaveCategory={onSaveCategory} /> : null }
      </div>

      <div className="row">
        {products.map(product => 
          product.modifiers.map(modifier => {
            return(
              <Product name={product.name} modifier={modifier}  makeFormVisible={makeFormVisible}/>
            );
          })
        )}
      </div>
    </div>
  );
}

ProductPage.propTypes = {
  products: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  formStatus: makeSelectFormVisibility(),
  newProduct: makeSelectNewProduct(),
  newMod: makeSelectNewMod(),
  newCat: makeSelectNewCategory(),
  selected: makeSelectSelectedProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadProducts: (products) => dispatch(loadProducts(products)),
    makeFormVisible: (form, visibility) => dispatch(makeFormVisible(form, visibility)),
    onChangePrdct: (property, value) => dispatch(changeProduct(property, value)),
    onChangeMod: (property, value) => dispatch(changeMod(property, value)),
    onChangeCat: (property, value) => dispatch(changeCategory(property, value)),
    onSaveProduct: () => dispatch(saveProduct()),
    onSaveCategory: () => dispatch(saveCategory()),
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
