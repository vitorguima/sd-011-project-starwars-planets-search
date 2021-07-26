import React from 'react';
import './App.css';
import FilterList from './components/FilterList';
import Forms from './components/Forms';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Forms />
      <FilterList />
      <Table />
    </Provider>
  );
}

export default App;
