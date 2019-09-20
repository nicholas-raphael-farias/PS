import React from 'react'

const Navbar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">PS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class={(props.is_active === 'dashboard') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/dashboard">Dashboard</a>
          </li>
          <li class={(props.is_active === 'employees') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/employees">Empleados</a>
          </li>
          <li class={(props.is_active === 'product') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/product">Productos</a>
          </li>
          <li class={(props.is_active === 'analytics') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/analytics">Analytics</a>
          </li>
          <li class={(props.is_active === 'flow') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/flow">Flujo</a>
          </li>
          <li class={(props.is_active === 'cash') ? 'nav-item active' : 'nav-item'}>
            <a class="nav-link" href="/cash">Caja</a>
          </li>
        </ul>
        <span class="navbar-text">
          Cerrar Sesión
        </span>
      </div>
    </nav>
  )
}

export default Navbar

