import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import Modal from '../../components/Modal';
export default class CashRegisterPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='cash'/>
        <h1>cash</h1>
        <Modal is_visible={false}/>
      </div>
    )
  }
}
