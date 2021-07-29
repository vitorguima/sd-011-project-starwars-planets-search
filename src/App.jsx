import React from 'react';

import { TableContextProvider } from './contexts/TableContext';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <TableContextProvider>
      <div>
        <header>
          <h1>Star Wars Planets Database</h1>
        </header>
        <main>
          <Table />
        </main>
      </div>
    </TableContextProvider>
  );
}

export default App;
