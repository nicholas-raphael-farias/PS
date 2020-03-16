import React, { memo } from 'react'

const TablePromos =({promos, onDeletePromo, onSelectPromo}) => {
  return(
    <div className="row justify-content-center" style={{marginTop:'20vh'}}>
    <table className="col-8 table table-sm table-striped" style={{backgroundColor: 'white'}}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tipo</th>
          <th scope="col">Producto</th>
          <th scope="col">Porcentaje</th>
          <th scope="col">Fecha de expiracion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {promos.map(promo => {
          return (
            <tr style={{cursor:'pointer'}}>
              <th scope="row">1</th>
              <td>{promo.tipo}</td> 
              <td>{promo.producto}</td>
              <td>{promo.porcentaje}</td>
              <td>{typeof(promo.fecha_expiracion) === 'object' ? promo.fecha_expiracion.toLocaleDateString("es-MX") : new Date(promo.fecha_expiracion).toLocaleDateString() }</td>
              <td style={{border:"none"}}>      
                <img src="r.png" style={{height:"16px", cursor:"pointer", margin:"0 4px"}} onClick={() => {
                  onSelectPromo(promo._id);
                  onDeletePromo();
                }}/>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
export default TablePromos;