import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <h1>Starwars Planets</h1>
      <Table />
    </PlanetProvider>
  );
}

export default App;
