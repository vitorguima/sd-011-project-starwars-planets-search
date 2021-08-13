import React from 'react';
import './App.css';
import NumericFilter from './components/NumericFilter';
import SearchName from './components/SearchName';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <SearchName />
      <NumericFilter />
      <Table />
    </PlanetProvider>
  );
}

export default App;
