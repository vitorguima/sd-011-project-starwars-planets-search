import React from 'react';
import './App.css';
import Table from './components/Table';
import StarwarsPlanetsProvider from './context/StarwarsPlanetsProvider';
import Filters from './components/Filters';

function App() {
  return (
    <main>
      <StarwarsPlanetsProvider>
        <Filters />
        <Table />
      </StarwarsPlanetsProvider>
    </main>
  );
}

export default App;
