import React from 'react';
import Table from './components/Table';
import PlanetProvider from './context/PlanetProvider';
import HandleFilters from './components/HandleFilters';
import './styles/App.css';

function App() {
  return (
    <div>
      <PlanetProvider>
        <h1>Star Wars Planet Search</h1>
        <HandleFilters />
        <Table />
      </PlanetProvider>
    </div>
  );
}

export default App;
