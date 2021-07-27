import React from 'react';
import './App.css';
import Provider from './APIcontext/Provider';
import Table from './components/Table';
import NameInput from './components/NameInput';
import Selects from './components/Selects';
import FilterList from './components/FilterList';

function App() {
  return (
    <Provider>
      <NameInput />
      <Selects />
      <FilterList />
      <Table />
    </Provider>
  );
}

export default App;
