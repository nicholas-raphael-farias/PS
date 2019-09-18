import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';

import HomePage from './../HomePage/Loadable';
import SecondPage from './../SecondPage/Loadable';
import ProductsPage from './../ProductsPage/Loadable';
import LoginPage from './../LoginPage/Loadable'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/second" component={SecondPage} />
        <Route exact path="/products" component={ProductsPage} />
      </Switch>
    </div>
  );
}

export default App;