import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';

import HomePage from './../HomePage/Loadable';
import SecondPage from './../SecondPage/Loadable';
import ProductsPage from './../ProductsPage/Loadable';
import LoginPage from './../LoginPage/Loadable'
import SignupPage from './../SignupPage/Loadable'
import DashboardPage from './../DashboardPage/Loadable'
import EmployeesPage from './../EmployeesPage/Loadable'
import ProductPage from './../ProductPage/Loadable'
import AnalyticsPage from './../AnalyticsPage/Loadable'
import FlowPage from './../FlowPage/Loadable'
import CashRegisterPage from './../CashRegisterPage/Loadable'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/employees" component={EmployeesPage} />
        <Route exact path="/product" component={ProductPage} />
        <Route exact path="/analytics" component={AnalyticsPage} />
        <Route exact path="/flow" component={FlowPage} />
        <Route exact path="/cash" component={CashRegisterPage} />
        <Route exact path="/second" component={SecondPage} />
        <Route exact path="/products" component={ProductsPage} />
      </Switch>
    </div>
  );
}

export default App;