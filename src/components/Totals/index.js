import React from 'react'

const Totals = ({subtotal}) => {
  return (
    <div className="row" style={{height:"20vh", backgroundColor:"white", width:"inherit", position:"absolute", bottom:"8px"}}>
      <div className="col-12">
        <p>Subtotal: {subtotal}</p>
      </div>
    </div>
  )
}

export default Totals
