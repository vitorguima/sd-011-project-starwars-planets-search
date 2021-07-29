import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Table from './Components/Table';
import StarWarsProvider from './Context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={ Table } />
        </Switch>
      </Router>
    </StarWarsProvider>
  );
}

export default App;
