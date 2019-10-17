import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import HomePage from './../HomePage/Loadable'
import SecondPage from './../SecondPage/Loadable'
import ProductsPage from './../ProductsPage/Loadable'
import UltimatePage from './../UltimateProduct/Loadable'
import UltimateSingle from './../UltimateSingle/Loadable'
import LoginPage from './../LoginPage/Loadable'
import SignupPage from './../SignupPage/Loadable'
import DashboardPage from './../DashboardPage/Loadable'
import EmployeesPage from './../EmployeesPage/Loadable'
import EmployeesUltimate from './../UltimateEmployees/Loadable'
import ProductPage from './../ProductPage/Loadable'
import AnalyticsPage from './../AnalyticsPage/Loadable'
import FlowPage from './../FlowPage/Loadable'
import CashRegisterPage from './../CashRegisterPage/Loadable'

import { Redirect } from 'react-router'
import { checkSession } from './../../utils/session'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/dashboard" render={() => checkSession() ? (<DashboardPage/>)    : (<Redirect to="/login" />)} />
          <Route exact path="/employees" render={() => checkSession() ? (<EmployeesUltimate/>)    : (<Redirect to="/login" />)} />
          <Route exact path="/product"   render={() => checkSession() ? (<ProductPage/>)      : (<Redirect to="/login" />)} />
          <Route exact path="/analytics" render={() => checkSession() ? (<AnalyticsPage/>)    : (<Redirect to="/login" />)} />
          <Route exact path="/flow"      render={() => checkSession() ? (<FlowPage/>)         : (<Redirect to="/login" />)} />
          <Route exact path="/cash"      render={() => checkSession() ? (<CashRegisterPage/>) : (<Redirect to="/login" />)} />
          <Route exact path="/second"    render={() => checkSession() ? (<SecondPage/>)       : (<Redirect to="/login" />)} />
          <Route exact path="/products"  render={() => checkSession() ? (<ProductsPage/>)     : (<Redirect to="/login" />)} />
          <Route exact path="/ultimate"  render={() => checkSession() ? (<UltimatePage/>)     : (<Redirect to="/login" />)} />
          <Route path="/ultimate/:productId"  render={(props) => checkSession() ? (<UltimateSingle {...props} />)     : (<Redirect to="/login" />)} />
        </Switch>
      </div>
    </DndProvider>
  );
}

export default App;