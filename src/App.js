import React from 'react';
import Header from './components/Header';
import HeaderFilter from './components/HeaderFilters';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <HeaderFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
