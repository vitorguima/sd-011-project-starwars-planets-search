import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/PlanetsTable';

function App() {
  return (
    <PlanetsProvider>
      <span>Project StarWars Planets Search!</span>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
