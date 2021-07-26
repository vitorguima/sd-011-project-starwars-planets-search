import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <span className="title">🪐Star Wars Planets🪐</span>
      <Table />
    </PlanetProvider>
  );
}

export default App;
