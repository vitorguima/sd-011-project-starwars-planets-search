import React from 'react';
import { Table, Controls } from './Components';
import { PlanetProvider } from './hooks/usePlanets';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <header />
      <main>
        <Controls />
        <Table />
      </main>
      <footer />
    </PlanetProvider>
  );
}

export default App;
