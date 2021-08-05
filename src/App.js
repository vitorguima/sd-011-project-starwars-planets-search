import React from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetProvider';
import './App.css';
import NameInput from './components/NameInput';
import FormSelectors from './components/FormSelectors';

function App() {
  return (
    <PlanetsProvider>
      <NameInput />
      <FormSelectors />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
