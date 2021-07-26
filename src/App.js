import React from 'react';
import { GlobalStorage } from './GlobalContext';
import Table from './Table';
import './App.css';

function App() {
  return (
    <GlobalStorage>
      <Table />
    </GlobalStorage>
  );
}

export default App;
