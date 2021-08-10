import React from 'react';
import PlanetsProvider from './provider/PlanetsProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
