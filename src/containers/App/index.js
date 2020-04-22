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
import LoginEmployeesPage from './../LoginEmployeesPage/Loadable'
import BuyProcessPage from './../BuyProcessPage/Loadable'
import CheckoutPage from './../CheckoutPage/Loadable'
import DemoPage from './../DemoPage'
import PromosPage from '../PromosPage/Loadable'
import TicketsPage from '../TicketsPage/Loadable'
import TicketDetailPage from '../TicketDetailPage/Loadable'

import { Redirect } from 'react-router'
import { checkSession } from './../../utils/session'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route exact path="/demo" component={DemoPage} />
          <Route exact path="/" component={LoginPage} />
          <Route path="/employees/checkout" component={CheckoutPage} />
          <Route exact path="/employees/login" component={LoginEmployeesPage} />
          <Route path="/employees/buy_process" component={BuyProcessPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/dashboard" render={() => checkSession() ? (<DashboardPage/>)      : (<Redirect to="/login" />)} />
          <Route path="/employees" render={() => checkSession() ? (<EmployeesUltimate/>)  : (<Redirect to="/login" />)} />
          <Route path="/product"   render={() => checkSession() ? (<ProductPage/>)        : (<Redirect to="/login" />)} />
          <Route path="/analytics" render={() => checkSession() ? (<AnalyticsPage/>)      : (<Redirect to="/login" />)} />
          <Route path="/flow"      render={() => checkSession() ? (<FlowPage/>)           : (<Redirect to="/login" />)} />
          <Route path="/cash"      render={() => checkSession() ? (<CashRegisterPage/>)   : (<Redirect to="/login" />)} />
          <Route path="/second"    render={() => checkSession() ? (<SecondPage/>)         : (<Redirect to="/login" />)} />
          <Route path="/products"  render={() => checkSession() ? (<ProductsPage/>)       : (<Redirect to="/login" />)} />
          <Route path="/promos"  render={() => checkSession() ? (<PromosPage/>)       : (<Redirect to="/login" />)} />
          <Route exact path="/tickets"  render={() => checkSession() ? (<TicketsPage/>)       : (<Redirect to="/login" />)} />
          <Route path="/tickets/:ticketId"  render={(props) => checkSession() ? (<TicketDetailPage {...props} />)     : (<Redirect to="/login" />)} />
          <Route exact path="/ultimate"  render={() => checkSession() ? (<UltimatePage/>) : (<Redirect to="/login" />)} />
          <Route path="/ultimate/:productId"  render={(props) => checkSession() ? (<UltimateSingle {...props} />)     : (<Redirect to="/login" />)} />
        </Switch>
    </DndProvider>
  );
}

export default App;