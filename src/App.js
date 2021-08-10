import React from 'react';
import Table from './components/Table';
import SWPlanetsProvider from './context/Provider';
import './App.css';

function App() {
  return (
    <SWPlanetsProvider>
      <Table />
    </SWPlanetsProvider>
  );
}

export default App;
