import React from 'react';
import Table from './components/Table';
import Provider from './context/Provider';
import Filter from './components/Filter';

const App = () => (
  <div>
    <Provider>
      <Filter />
      <Table />
    </Provider>
  </div>

);

export default App;
