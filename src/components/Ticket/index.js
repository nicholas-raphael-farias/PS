import React from 'react'

import Totals from './../Totals'

const Ticket = ({bought_products, subtotal, onEditModifier, onDeleteProduct}) => {
  return (
    <div className="col-4" style={{height:"100vh", backgroundColor:"pink"}}>
      <h1>Ticket</h1>
      {bought_products.map( p => {
        return(
          <div className="row justify-content-end">
            <div className="col-12" style={{backgroundColor:"white"}}>
              <span 
                class="badge badge-danger" 
                style={{float:"left", marginTop:"3px"}}
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
                <div className="col-11" onClick={() => onEditModifier(p.ticket_id, m.name)}>
                  <span style={{float:"left"}}>{o.name}</span>
                  <span style={{float:"right"}}> ${o.price} </span>
                </div>
              )
            )}
          </div>
        );
      })}
    
      <Totals subtotal={subtotal}/>
    </div>
  )
}

export default Ticket
