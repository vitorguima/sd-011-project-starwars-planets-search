import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './Providers/PlanetsProvider';

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
