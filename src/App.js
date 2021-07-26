import React from 'react';
import TableProvider from './provider/TableProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <TableProvider>
      <Table />
    </TableProvider>
  );
}

export default App;
