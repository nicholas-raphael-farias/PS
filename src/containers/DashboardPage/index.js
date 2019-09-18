import React, { Component } from 'react'

const Navbar = () => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">PS</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Dashboard <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/employees">Empleados</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Analytics</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Flujo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Caja</a>
        </li>
      </ul>
      <span class="navbar-text">
        Cerrar Sesión
      </span>
    </div>
  </nav>
);

export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
      </div>
    )
  }
}
