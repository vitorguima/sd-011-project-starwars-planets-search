import React from 'react';
import Filters from './components/Filters';
import ExFilter from './components/ExFilter';
import Table from './components/Table';
import Provider from './context/Provider';

import './App.css';

function App() {
  return (
    <Provider>
      <span>Star Wars Planets Search</span>
      <Filters />
      <ExFilter />
      <Table />
    </Provider>
  );
}

export default App;
