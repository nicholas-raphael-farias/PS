import React from 'react'
import { Redirect } from 'react-router';



class Navbar extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      is_loggedIn: true,
    }
  }
  

  render(){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {this.state.is_loggedIn ? null : <Redirect to="/login" /> }
        <a className="navbar-brand" href="#">PS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className={(this.props.is_active === 'dashboard') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className={(this.props.is_active === 'employees') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/employees">Empleados</a>
            </li>
            <li className={(this.props.is_active === 'product') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/ultimate">Productos</a>
            </li>
            <li className={(this.props.is_active === 'analytics') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/analytics">Analytics</a>
            </li>
            <li className={(this.props.is_active === 'flow') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/flow">Flujo</a>
            </li>
            <li className={(this.props.is_active === 'cash') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/cash">Caja</a>
            </li>
          </ul>
          <span className="navbar-text" style={{cursor: "pointer"}} onClick={() => {
            localStorage.removeItem("PointOfSaleToken");
           this.setState({is_loggedIn: false});
          }}>
            Cerrar Sesión
          </span>
        </div>
      </nav>
    )
  }

}

export default Navbar;

