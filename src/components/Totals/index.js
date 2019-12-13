import React from 'react'

const Totals = ({subtotal}) => {
  return (
    <div className="row" style={{backgroundColor:"white", position:"absolute", bottom:0, width:"100%"}}>
      <div className="col">
      {subtotal}
      </div>
    </div>
  )
}

export default Totals
