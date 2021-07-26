import React from 'react';
import './App.css';
import FilterPlanetsName from './components/FilterPlanetsName';
import TablePlanets from './components/TablePlanets';
import PlanetProvider from './Provider/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <FilterPlanetsName />
      <TablePlanets />
    </PlanetProvider>
  );
}

export default App;
