import React from 'react';
import Table from './components/tabela';
import Provider from './context/provider';
import Filter from './components/filters';
import Order from './components/ordena';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
      <Filter />
      <Order />
      <Table />
    </Provider>
  );
}

export default App;
