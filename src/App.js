import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import FilterPlanets from './components/FilterPlanets';

function App() {
  return (
    <PlanetsProvider>
      <FilterPlanets />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
