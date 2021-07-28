import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './components/Table';
import FilteredName from './components/FilteredName';

function App() {
  return (
    <Provider>
      <FilteredName />
      <Table />
    </Provider>
  );
}

export default App;
