import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

export default class CashRegisterPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='cash'/>
        <h1>cash</h1>
      </div>
    )
  }
}
