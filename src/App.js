import React from 'react';
import PlanetsProvider from './provider/planetsProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <span>Hello, App!</span>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
