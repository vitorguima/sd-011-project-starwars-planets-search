import React from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/Provider';
import Form from './components/Form';

function App() {
  return (
    <PlanetsProvider>
      <Form />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
