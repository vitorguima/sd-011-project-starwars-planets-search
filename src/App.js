import React from 'react';
import Filter from './components/Filter';
import Provider from './context/provider';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
