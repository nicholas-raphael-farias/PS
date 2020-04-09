import React, { memo } from 'react'



const mapType = (type) => {
  switch (type) {
    case '1':
      return 'Descuento';
    case '2':
      return '2x1';
    case '3':
      return '3x1';
    default:
      break;
  }
}

const TablePromos =({promos, products, onDeletePromo, onSelectPromo}) => {
  return(
    <div className="row justify-content-center" style={{marginTop:'20vh'}}>
    <table className="col-8 table table-sm table-striped" style={{backgroundColor: 'white'}}>
      <thead>
        <tr>
          <th scope="col">Tipo</th>
          <th scope="col">Producto</th>
          <th scope="col">Porcentaje</th>
          <th scope="col">Fecha de expiracion</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
      {promos.map(promo => {
          let product_name = products.filter(p => p._id == promo.producto);
          return (
            <tr style={{cursor:'pointer'}}>
              <td>{mapType(promo.tipo)}</td> 
              <td>{product_name[0] === undefined ? null : product_name[0].name}</td>
              <td>{promo.tipo === '1' ? promo.porcentaje : 'No aplica'}</td>
              <td>{typeof(promo.fecha_expiracion) === 'object' ? promo.fecha_expiracion.toLocaleDateString("es-MX") : new Date(promo.fecha_expiracion).toLocaleDateString() }</td>
              <td style={{border:"none"}}>      
                <img src="r.png" style={{height:"14px", cursor:"pointer", margin:"0 4px"}} onClick={() => {
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