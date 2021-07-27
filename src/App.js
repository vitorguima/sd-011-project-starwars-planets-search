import React from 'react';
import './App.css';
import FilterByName from './Components/FilterByName';
import FilterByNumber from './Components/FilterByNumber';
import Table from './Components/Table';
import RequisitionProvider from './Context/RequisitionProvider';

function App() {
  return (
    <RequisitionProvider>
      <FilterByName />
      <FilterByNumber />
      <Table />
    </RequisitionProvider>
  );
}

export default App;
