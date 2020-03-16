import React from 'react'
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";


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
              <a className="nav-link" href="/PS/dashboard">Dashboard</a>
            </li>
            <li className={(this.props.is_active === 'employees') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/PS/employees">Employees</a>
            </li>
            <li className={(this.props.is_active === 'product') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/PS/ultimate">Products</a>
            </li>
            <li className={(this.props.is_active === 'promos') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/PS/promos">Promos</a>
            </li>
            <li className={(this.props.is_active === 'flow') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/PS/flow">Flujo</a>
            </li>
            <li className={(this.props.is_active === 'cash') ? 'nav-item active' : 'nav-item'}>
              <a className="nav-link" href="/PS/cash">Caja</a>
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

