import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Table from './Components/Table';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Table } />
      </Switch>
    </Router>
  );
}

export default App;
