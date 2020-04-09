import React, {useEffect, memo} from 'react';

const Pad = ({is_active_coin_pad, onAddMoney, onPadTypeChange}) => {

  const elements = [
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

  const coin_elements = [
    {value:1, is_bill:true, img:"1_peso.png"},
    {value:2, is_bill:true, img:"2pesos.png"},
    {value:5, is_bill:true, img:"5pesos.png"},
    {value:10, is_bill:true, img:"10_pesos.png"},
    {value:20, is_bill:true, img:"20pesos.jpg"},
    {value:50, is_bill:true, img:"50pesos.jpg"},
    {value:100, is_bill:true, img:"100pesos.jpg"},
    {value:200, is_bill:true, img:"200pesos.jpg"},
    {value:500, is_bill:true, img:"500pesos.jpg"}
  ]

  const active_elements = is_active_coin_pad ? coin_elements : elements

  return (
    <div className="col-12 col-md-8" style={{marginTop:"40px"}}>
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch1" checked={is_active_coin_pad} onClick={() => onPadTypeChange() }/>
        <label class="custom-control-label" for="customSwitch1">Pad con monedas {is_active_coin_pad ? 'activado' : 'desactivado'}: </label>
      </div>
      <div className="padd">
        {active_elements.map(e => 
          <div onClick={() => onAddMoney(e.value)} className={is_active_coin_pad ? "paddCoinElement": "paddElement"}>
            {e.is_bill ? <img style={{width:"90%"}} src={`/PS/${e.img}`} /> : e.value}
          </div>)}
      </div>
    </div>
  )
}

export default Pad;