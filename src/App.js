import React from 'react';
import FilterHeader from './components/FilterHeader';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FiltersSelected from './components/FiltersSelected';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <FilterHeader />
      <FiltersSelected />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
