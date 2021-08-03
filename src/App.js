import React from 'react';
import StarwarsPlanetsProvider from './context/StarwarsPlanetsProvider';
import Data from './components/Data';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <StarwarsPlanetsProvider>
      <Data />
      <Table />
    </StarwarsPlanetsProvider>
  );
}

export default App;
