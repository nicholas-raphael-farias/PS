import React, { Component } from 'react'

export default class SignupPage extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card" style={{marginTop:'calc(50vh - 200px)'}}>
            <div className="card-body" style={{textAlign:'left'}}>
              <div class="form-group">
                <label>Nombre(s)</label>
                <input type="text" class="form-control" placeholder="Nombre(s)"/>
              </div>
              <div class="form-group">
                <label>Correo Electrónico</label>
                <input type="email" class="form-control" placeholder="Correo Electrónico"/>
              </div>
              <div class="form-group">
                <label>Código</label>
                <input type="password" class="form-control" placeholder="Código"/>
              </div>
              <div className="btn btn-dark" style={{width:'100%'}}>Crear</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
