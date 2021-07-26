import React from 'react';
import './App.css';
import FilterPlanetsName from './components/FilterPlanetsName';
import FilterPlanetsValues from './components/FilterPlanetsValues';
import TablePlanets from './components/TablePlanets';
import PlanetProvider from './Provider/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <FilterPlanetsName />
      <FilterPlanetsValues />
      <TablePlanets />
    </PlanetProvider>
  );
}

export default App;
