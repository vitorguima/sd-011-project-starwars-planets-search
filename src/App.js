import React from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetProvider';
import './App.css';
import NameInput from './components/NameInput';
import FormSelectors from './components/FormSelectors';
import OrderColumns from './components/OrderColumns';

function App() {
  return (
    <PlanetsProvider>
      <NameInput />
      <FormSelectors />
      <OrderColumns />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
