import React from 'react';
import './App.css';
import Table from './components/Table';
import { GlobalStorage } from './hooks/Context';

function App() {
  return (
    <GlobalStorage>
      <Table />
    </GlobalStorage>
  );
}

export default App;
