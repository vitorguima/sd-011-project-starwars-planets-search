import React from 'react';
import './App.css';
import PlanetsProvider from './context/planetsProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
