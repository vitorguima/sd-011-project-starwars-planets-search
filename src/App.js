import React from 'react';
import './App.css';
import Filters from './Filters';
import Provider from './PlanetsProvider';
import Table from './Table';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
