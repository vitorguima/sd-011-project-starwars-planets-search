import React from 'react';
import StarwarsPlanetsProvider from './context/StarwarsPlanetsProvider';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <StarwarsPlanetsProvider>
      <span>Starwars Planets Search</span>
      <Table />
    </StarwarsPlanetsProvider>
  );
}

export default App;
