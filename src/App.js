import React from 'react';
import StarWarsProvider from './components/Provider';
import Table from './components/Table';
import FilterPlanet from './components/FilterPlanet';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App!</span>
      <FilterPlanet />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
