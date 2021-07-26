import React from 'react';
import './App.css';
import Table from './components/Table';
import { GlobalStorage } from './hooks/Context';
// import Filters from './components/Filters';

function App() {
  return (
    <GlobalStorage>
      {/* <Filters /> */}
      <Table />
    </GlobalStorage>
  );
}

export default App;
