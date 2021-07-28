import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Filters from './components/Filters';
import Table from './components/PlanetsTable';

function App() {
  return (
    <>
      <h1>Project StarWars Planets Search!</h1>
      <PlanetsProvider>
        <Filters />
        <Table />
      </PlanetsProvider>
    </>
  );
}

export default App;
