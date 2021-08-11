import React from 'react';
import TablePlanetsProvider from './contexts/TablePlanetsProvider';
import TableFiltered from './components/TableFiltered';
import './App.css';

function App() {
  return (
    <TablePlanetsProvider>
      <TableFiltered />
    </TablePlanetsProvider>
  );
}

export default App;
