import React, {useEffect, memo} from 'react';

const Pad = ({onAddMoney}) => {

  let elements = [
    {value:1, is_bill:false, img:""},
    {value:2, is_bill:false, img:""},
    {value:3, is_bill:false, img:""},
    {value:10, is_bill:false, img:""},
    {value:4, is_bill:false, img:""},
    {value:5, is_bill:false, img:""},
    {value:6, is_bill:false, img:""},
    {value:20, is_bill:true, img:"20pesos.jpg"},
    {value:7, is_bill:false, img:""},
    {value:8, is_bill:false, img:""},
    {value:9, is_bill:false, img:""},
    {value:50, is_bill:true, img:"50pesos.jpg"},
    {value:100, is_bill:true, img:"100pesos.jpg"},
    {value:200, is_bill:true, img:"200pesos.jpg"},
    {value:500, is_bill:true, img:"500pesos.jpg"}
  ]

  return (
    <div className="col-8" style={{marginTop:"40px"}}>
      <div className="padd">
        {elements.map(e => 
          <div onClick={() => onAddMoney(e.value)} className="paddElement">
            {e.is_bill ? <img style={{width:"90%"}} src={`/PS/${e.img}`} /> : e.value}
          </div>)}
      </div>
    </div>
  )
}

export default Pad;