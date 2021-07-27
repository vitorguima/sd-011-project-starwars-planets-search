import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './hooks/PlanetsProvider';
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
