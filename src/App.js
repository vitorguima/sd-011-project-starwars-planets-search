import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import FilterPlanets from './components/FilterPlanets';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planets Search</h1>
      <FilterPlanets />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
