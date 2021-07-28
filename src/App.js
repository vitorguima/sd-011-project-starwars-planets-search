import React from 'react';
import './App.css';
import Header from './Header';
import Table from './Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div className="container">
        <Header />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
