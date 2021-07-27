import React from 'react';
import './App.css';
import PlanetProvider from './context/planetProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;
