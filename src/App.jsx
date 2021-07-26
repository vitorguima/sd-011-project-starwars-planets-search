import React from 'react';
import Table from './Table';
import { PlanetProvider } from './usePlanets';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <header />
      <main>
        <Table />
      </main>
      <footer />
    </PlanetProvider>
  );
}

export default App;
