import React from 'react';
import FilterHeader from './components/FilterHeader';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <FilterHeader />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
