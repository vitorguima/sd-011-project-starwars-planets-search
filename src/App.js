import React from 'react';
import './App.css';
import PlanetProvider from './Context/PlanetProvider';
import Table from './Components/Table';

function App() {
  return (
    <div>
      <PlanetProvider>
        <Table />
      </PlanetProvider>
    </div>
  );
}

export default App;
