import React, { Component } from 'react'
import  Button from './../../components/Button'

export default class LoginPage extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4" style={{marginTop:'calc(50vh - 160px)'}}>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
              <label htmlFor="exampleInputEmail1">INGRESAR CÓDIGO</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Ingresar Código"/>
              <small id="emailHelp" className="form-text text-muted">Tu código es personal, no lo compartas con nadie.</small>
              </div>
            </div>
          </div>          
          <div className="btn btn-dark" style={{marginTop:'24px', width:'160px'}}>Ingresar</div>
        </div>
      </div>
    )
  }
}