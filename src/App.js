import React from 'react';
import './App.css';
import Table from './components/Table';
import { Provider } from './hooks/Context';
import Filter from './components/Filters';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
