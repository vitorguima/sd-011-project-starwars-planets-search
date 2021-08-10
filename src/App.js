import React from 'react';
import Table from './components/Table';
import SWPlanetsProvider from './context/Provider';
import Filter from './components/Filter'
import './App.css';

function App() {
  return (
    <SWPlanetsProvider>
      <Filter />
      <Table />
    </SWPlanetsProvider>
  );
}

export default App;
