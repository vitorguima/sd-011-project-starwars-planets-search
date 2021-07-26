import React from 'react';
import PlanetsProvider from '../contexts/PlanetsProvider';
import Table from '../components/Table';
import Filter from '../components/Filter';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <h1>Star Wars Planets - Encontre um planeta</h1>
      <Filter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
