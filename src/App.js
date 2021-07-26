import React from 'react';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <h1><span>Star Wars Planet Search</span></h1>
      <Table />
    </PlanetProvider>
  );
}

export default App;
