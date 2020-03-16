import React from 'react'

const CancelBtn = ({onCancelProduct, product_count}) => {
  return (
    <div>
      <div className={`btn btn-dark ${product_count !== 0 ? '' : 'disabled'}`} style={{position:"absolute",  left:"8px", bottom:"8px"}}
      onClick={product_count !== 0 ? onCancelProduct : ()=>{}}>
        Cancelar
      </div>
    </div>
  )
}

const FinishBuyingProcessBtn = ({onRedirectToCheckout, product_count, onSaveTicket}) => {
  return (
    <div onClick={product_count === 0 ? onSaveTicket : ()=>{}} className={`btn btn-dark ${product_count === 0 ? '' : 'disabled'}`} style={{position:"absolute", right:"8px", bottom:"8px"}}>
      Cobrar
    </div>
  )
}

const Totals = ({subtotal, descuento, onRedirectToCheckout, product_modifiers, onCancelProduct, onSaveTicket}) => {
  return (
    <div style={{height:"20vh", backgroundColor:"white", width:"calc(100% - 8px)", position:"absolute", right:"8px", bottom:"8px", padding:"8px", maxWidth:"400px"}}>
      <div className="col-12">
        <span style={{float:"right"}}> 
          <span style={{marginRight:"8vw"}}>Subtotal:</span> 
            ${subtotal} <br/>
        </span>
      </div>
      <div className="col-12">
      <span style={{float:"right"}}> 
          <span style={{marginRight:"8vw"}}>Descuento:</span> 
            ${descuento} <br/>
        </span>
      </div>
      <div className="col-12">
      <span style={{float:"right"}}> 
          <span style={{marginRight:"8vw"}}>Total:</span> 
            ${subtotal - descuento} <br/>
        </span>
      </div>

      
      <FinishBuyingProcessBtn 
      onRedirectToCheckout={onRedirectToCheckout}
      product_count={product_modifiers.length}
      onSaveTicket={onSaveTicket}/>
     
  
      <CancelBtn onCancelProduct={onCancelProduct}
      product_count={product_modifiers.length}/>
        

    </div>
  )
}

const Ticket = ({bought_products, subtotal, onEditModifier, onDeleteProduct, onRedirectToCheckout, product_modifiers, onCancelProduct, onSaveTicket}) => {
  return (
    <div className="col-4" style={{}}>
      <div className="row" style={{margin: '10px',backgroundColor: 'white', maxHeight:"70vh", overflow:"auto"}}>
      <div className="col-12" style={{backgroundColor:"black"}}>
        <span style={{color:"white", float:"left"}}>Producto</span>
        <span style={{color:"white", float:"right"}}>Precio</span>
      </div>
        {bought_products.map( p => {
          return(
            <div className="col-12" style={{padding:"4px 8px 0px 4px"}}>
              <div style={{width:"inherit", display:"inline-block"}}>
                <span 
                  class="badge badge-danger" 
                  style={{float:"left", marginTop:"3px", cursor:"pointer"}}
                  onClick={() => onDeleteProduct(p.ticket_id)}
                >-</span>
                <span 
                  style={{float:"left", marginLeft:"8px"}}
                  >{p.name}
                </span>
                { p.price !== 0 ? <span style={{float:"right"}}> ${p.price} </span> : null }
              </div>
              {p.modifiers.map(m => 
                m.options.map(o => 
                  <div style={{width:"inherit", display:"inline-block"}} onClick={() => onEditModifier(p.ticket_id, m.name)}>
                    <span style={{float:"left"}}>{o.name}</span>
                    <span style={{float:"right"}}> ${o.price} </span>
                  </div>
                )
              )}
            </div>
          );
        })}
      </div>
    
      <Totals subtotal={subtotal} descuento={0} onSaveTicket={onSaveTicket} onRedirectToCheckout={onRedirectToCheckout} product_modifiers={product_modifiers} onCancelProduct={onCancelProduct}/>
    </div>
  )
}

export default Ticket
