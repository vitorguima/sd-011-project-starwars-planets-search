import React from 'react';
import Provider from './utils/Provider';
import Table from './components/Table';
import Filters from './components/Filters';
import AppliedFilters from './components/AppliedFilters';

function App() {
  return (
    <Provider>
      <Filters />
      <AppliedFilters />
      <Table />
    </Provider>
  );
}

export default App;
