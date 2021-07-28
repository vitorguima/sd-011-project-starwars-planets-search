import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import PlanetContext from './contexts/PlanetContext';
import InputHeader from './components/Input/InputHeader';

function App() {
  return (
    <PlanetContext>
      <InputHeader />
      <Table />
    </PlanetContext>);
}

export default App;
