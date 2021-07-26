import React from 'react';
import './App.css';
import Table from './components/Table';
import GlobalProvider from './context/GlobalProvider';
import Filter from './components/Filter';

function App() {
  return (
    <GlobalProvider>
      <Filter />
      <Table />
    </GlobalProvider>
  );
}

export default App;
