import React from 'react';
import './App.css';
import Provider from './components/Provider';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
