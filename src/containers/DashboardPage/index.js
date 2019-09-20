import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
export default class DashboardPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='dashboard'/>
      </div>
    )
  }
}
