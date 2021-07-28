import React from 'react';
import FilterHeader from './components/FilterHeader';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import FiltersSelected from './components/FiltersSelected';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <div className="root">
        <FilterHeader />
        <FiltersSelected />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
