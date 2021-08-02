import React from 'react';
import './App.css';
import PlanetProvider from './Context/PlanetProvider';
import Table from './Components/Table';
import FiltersForm from './Components/FiltersForm';

function App() {
  return (
    <div>
      <PlanetProvider>
        <FiltersForm />
        <Table />
      </PlanetProvider>
    </div>
  );
}

export default App;
