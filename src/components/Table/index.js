import React, { memo } from 'react'

const Table =(props) => {
  return(
    <div className="row justify-content-center" style={{marginTop:'20vh'}}>
    <table className="col-8 table table-sm table-striped" style={{backgroundColor: 'white'}}>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Teléfono</th>
          <th scope="col">Cumpleaños</th>
        </tr>
      </thead>
      <tbody>
      {props.employees.map(employee => {
          return (
            <tr onClick={() => props.onChangeUpdateFormVisibility(employee)} style={{cursor:'pointer'}}>
              <th scope="row">1</th>
              <td>{employee.name}</td> 
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{typeof(employee.birthday) === 'object' ? employee.birthday.toLocaleDateString("es-MX") : new Date(employee.birthday).toLocaleDateString() }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
export default Table;