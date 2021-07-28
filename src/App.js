import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetProvider from './context/PlanetProvider';
import FilterInput from './components/FilterInput';
import Selectors from './components/Selectors';

function App() {
  return (
    <PlanetProvider>
      <span className="title">🪐Star Wars Planets🪐</span>
      <FilterInput />
      <Selectors />
      <Table />
    </PlanetProvider>
  );
}

export default App;
