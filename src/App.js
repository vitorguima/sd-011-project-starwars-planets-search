import React from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetProvider';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
