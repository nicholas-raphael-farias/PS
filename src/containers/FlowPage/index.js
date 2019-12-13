import React, { useEffect, memo, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from './../../utils/injectReducer';
import { useInjectSaga } from './../../utils/injectSaga';

import { loadProducts, chooseProduct, dragAndDrop, addAndDrop, unassignModifier, addFirstItem, saveModifiers } from './actions';
import { makeSelectProducts, makeSelectChosenProduct } from './selectors';

import { getServerUrl } from './../../utils/serverURL';

import reducer from './reducer';
import saga from './saga';
import produce from 'immer';

import { useDrag, useDrop } from 'react-dnd';

const key = 'flow';


const Drop = ({modifiers, product, onDragAndDrop, onAddAndDrop, onUnassignModifier, onAddFirstItem, onSaveModifiers}) => {

  const [collectedProps, drop] = useDrop({
    accept: 'element',
    drop: (element) => onAddFirstItem(element),
  });

  return(
    <div ref={drop} className="col-8" style={{backgroundColor: "lightblue", height:"80px", display:"flex", paddingTop:"8px"}}>
      {modifiers.filter(({is_assigned}) => (is_assigned === true)).sort((a, b) => a.order - b.order).map(({name, is_assigned, order}) => (<Drag name={name} product={product} is_assigned={is_assigned} order={order} onDragAndDrop={onDragAndDrop} onAddAndDrop={onAddAndDrop} onUnassignModifier={onUnassignModifier} onSaveModifiers={onSaveModifiers} />))}
    </div>
  );



};


const Drag = ({name, product, is_assigned, order, onDragAndDrop, onAddAndDrop, onUnassignModifier, onSaveModifiers}) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'element',
    drop: () => onSaveModifiers(),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragOrder = item.order;
      const hoverOrder = order;

      // Don't replace items with themselves
      if (dragOrder === hoverOrder) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.left - hoverBoundingRect.rigth) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.rigth;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging leftwards
      if (hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging rigthwards
      if (hoverClientX > hoverMiddleX) {
        return;
      }

      console.log("perfom action");

      if(dragOrder === -1){
        console.log("add and drop");
        onAddAndDrop(item.name, hoverOrder);
        item.order = hoverOrder + 1;
      } else{
        console.log("drag and drop");
        onDragAndDrop(dragOrder, hoverOrder);
        item.order = hoverOrder;
      }
      // Time to actually perform the action
      //moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      //item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'element',name: name, product: product, is_assigned: is_assigned, order: order },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));


  return(
    <div ref={ref} className="card" style={{width:"max-content", height:"60px" ,opacity: isDragging ? 0.8 : 1, marginLeft: is_assigned ? "32px" : "8px", marginBottom:"8px"}}>
      {is_assigned ? <div className="close btn" aria-label="Close" style={{position: "absolute", top:"-11px", right:"0px", marginRight:"-10px"}} onClick={() => onUnassignModifier(name, order)}><span aria-hidden="true">&times;</span></div> : null }
      {is_assigned ? <span class="badge badge-dark" style={{width:"24px", position:"absolute", top:"0", left:"-24px", height:"100%", paddingTop:"24px"}}>{order + 1}</span> : null}
      <div className="card-body">
        {name}
      </div>
    </div>
  );
}

const ProductList = ({products, onChooseProduct}) => {
  return(
    <div class="input-group mb-3" style={{marginTop:'8px', padding:'0 20px'}}>
      <select class="custom-select" onChange={(evt) => onChooseProduct(evt.target.value)} >
        <option defaultValue="noProduct">Lista de Productos</option>
        {products.map(product => (<option value={product._id}>{product.name}</option>))}
      </select>
    </div>
  );
}

export function FlowPage ({
  products,
  chosenProduct,
  onLoadProducts,
  onChooseProduct,
  onDragAndDrop,
  onAddAndDrop,
  onUnassignModifier,
  onAddFirstItem,
  onSaveModifiers,
}) {
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

    return (
      <div>
        <Navbar is_active='flow'/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <h1>Flujos de Compra</h1>
            </div>
            <div className="col-12 col-md-6">
            <ProductList products={products} onChooseProduct={onChooseProduct}  />
            </div>
          </div>
          <div className="row" style={{minHeight:"80px"}}>
            <div className="col-4" style={{backgroundColor:"white", height:"80vh", display:"flex", flexWrap:"wrap", padding:"8px", alignContent:"flex-start", flex:"1"}}>
              {chosenProduct.modifiers.filter(({is_assigned}) => (is_assigned === false)).map(({name, is_assigned, order}) => (<Drag name={name} product={chosenProduct.name} is_assigned={is_assigned} order={order} onDragAndDrop={onDragAndDrop} onAddAndDrop={onAddAndDrop} onSaveModifiers={onSaveModifiers} />))}
            </div>
            <Drop modifiers={chosenProduct.modifiers} product={onChooseProduct.name} onDragAndDrop={onDragAndDrop} onAddAndDrop={onAddAndDrop} onUnassignModifier={onUnassignModifier} onAddFirstItem={onAddFirstItem} onSaveModifiers={onSaveModifiers} />              
          </div>
  
          
        </div>
      </div>
    )
}

FlowPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
  chosenProduct: makeSelectChosenProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadProducts: (products) => dispatch(loadProducts(products)),
    onChooseProduct: (product) => dispatch(chooseProduct(product)),
    onDragAndDrop: (dragOrder, hoverOrder) => dispatch(dragAndDrop(dragOrder, hoverOrder)),
    onAddAndDrop: (dragName, hoverOrder) => dispatch(addAndDrop(dragName, hoverOrder)),
    onUnassignModifier: (mod_name, mod_order) => dispatch(unassignModifier(mod_name, mod_order)),
    onAddFirstItem: (item) => dispatch(addFirstItem(item)),
    onSaveModifiers: () => dispatch(saveModifiers()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withConnect,
  memo,
)(FlowPage);

