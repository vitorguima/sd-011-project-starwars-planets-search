import React from 'react';
import './App.css';
import SearchName from './components/SearchName';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <SearchName />
      <Table />
    </PlanetProvider>
  );
}

export default App;
