import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

const Table =() => {
  return(
    <table className="col-8 table table-sm table-striped" style={{}}>
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
        <tr>
          <th scope="row">1</th>
          <td>Nombres</td>
          <td>correo electronico</td>
          <td>5553032548</td>
          <td>12/04/96</td>
        </tr>
        <tr>
          <th scope="row">1</th>
          <td>Nombres</td>
          <td>correo electronico</td>
          <td>5553032548</td>
          <td>12/04/96</td>
        </tr>
      </tbody>
    </table>
  );
}



export default class EmployeesPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='employees'/>
        <h1>Empleados</h1>
        <div style={{position:'absolute', top:'64px', right:'8px', width:'240px'}}>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><img src={'./public/search.svg'}/></span>
              </div>
              <input type="text" class="form-control" placeholder="Buscar" />
            </div>
        </div>
        <div className="row justify-content-center" style={{marginTop:'20vh'}}>
          <Table/>
        </div>
      </div>
    )
  }
}
