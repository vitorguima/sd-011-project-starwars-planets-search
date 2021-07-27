import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './Table';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
