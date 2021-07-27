import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <h1>Projeto StarWars</h1>
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
