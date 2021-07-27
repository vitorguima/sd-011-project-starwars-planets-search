import React from 'react';
import HeaderFilter from './components/HeaderFilters';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <HeaderFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
