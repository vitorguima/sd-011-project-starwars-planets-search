import React from 'react';
import './App.css';
import Provider from './context/Provider';
import FormsPlanets from './FormsPlanets';
import TablePlanets from './TablePlanets';

function App() {
  return (
    <Provider>
      <FormsPlanets />
      <TablePlanets />
    </Provider>
  );
}

export default App;
