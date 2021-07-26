import React from 'react';
import './App.css';
import Table from './components/Table';
import GlobalProvider from './context/GlobalProvider';
import FilterName from './components/FilterName';

function App() {
  return (
    <GlobalProvider>
      <FilterName />
      <Table />
    </GlobalProvider>
  );
}

export default App;
