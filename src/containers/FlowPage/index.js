import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

export default class FlowPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='flow'/>
        <h1>Flow Page</h1>
      </div>
    )
  }
}
