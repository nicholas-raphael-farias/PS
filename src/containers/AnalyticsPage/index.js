import React, { Component } from 'react'
import Navbar from '../../components/Navbar'

export default class AnalyticsPage extends Component {
  render() {
    return (
      <div>
        <Navbar is_active='analytics'/>
        <h1>Analytics</h1>
      </div>
    )
  }
}
