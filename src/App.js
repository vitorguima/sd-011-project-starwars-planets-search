import React from 'react';
import TablePlanetsProvider from './contexts/TablePlanetsProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <TablePlanetsProvider>
      <Table />
    </TablePlanetsProvider>
  );
}

export default App;
