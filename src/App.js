import React from 'react';
import NameInput from './components/NameInput';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetProvider';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <NameInput />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
