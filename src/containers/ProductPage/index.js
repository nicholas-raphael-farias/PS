import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

export default class ProductPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='product'/>
        <h1>Product</h1>
      </div>
    )
  }
}
