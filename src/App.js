import React from 'react';
import StarWarsProvider from './components/Provider';
import Table from './components/Table';
import FilterByNumber from './components/FilterByNumber';
import FilterPlanet from './components/FilterPlanet';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App!</span>
      <FilterPlanet />
      <FilterByNumber />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
