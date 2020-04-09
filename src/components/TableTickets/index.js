import React, { memo } from 'react'


const getDateString = (miliseconds) => {
  const date = new Date(miliseconds);
  return date.toDateString()
}


const TableTickets = ({tickets}) => {
  return(
    <div className="row justify-content-center" style={{marginTop:'20vh'}}>
    <table className="col-8 table table-sm table-striped" style={{backgroundColor: 'white'}}>
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">tipo de pago</th>
          <th scope="col">cliente</th>
          <th scope="col">Creado en</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
      {tickets.map(ticket => {
          return (
            <tr style={{cursor:'pointer'}}>
              <td>{ticket._id}</td> 
              <td>{ticket.tipo_de_pago}</td> 
              <td>{ticket.id_participante}</td> 
              <td>{getDateString(ticket.hora_creacion)}</td>
              <td>{ticket.total}</td>
              <td>      
                <a href={`http://localhost:3030/pdfs/${ticket._id}`} target="_blank">
                  <img src="/PS/pdf2.png" style={{height:"20px", cursor:"pointer", margin:"0 4px"}} onClick={() => {}}/>
                </a>
              </td> 
              <td>
                <a href={`/PS/tickets/${ticket._id}`}>Cancelar</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
export default TableTickets;