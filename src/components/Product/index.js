import React from 'react'

const Product = ({product, onAddToTicket}) => {

  const formatType = () => {
    switch (product.price) {
      case 0:
        return "Sin precio"
      default:
        return `$ ${product.price}`
    };
  };

  return (
    <div className="card" style={{width: '240px', margin:'8px', cursor:"pointer"}} onClick={() => onAddToTicket(product)}>
      {product.modifiers.filter(m => m.order !== -1).length > 0 ? null : <div style={{position:"absolute", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.5)"}}>
        <span class="badge badge-danger" style={{marginTop:"40px"}}>Sin proceso de compra</span>
      </div> }
      <div class="modal-header">
        <span>{product.name}</span>
        <span>{formatType()}</span>
      </div>
      <div className="card-body">
      </div>
    </div>
  )
}

export default Product
