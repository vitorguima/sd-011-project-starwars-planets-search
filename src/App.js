import React from 'react';
import './App.css';
import Table from './Components/Table';
import { GlobalStorage } from './GlobalContext';

function App() {
  return (
    <GlobalStorage>
      <Table />
    </GlobalStorage>
  );
}

export default App;
