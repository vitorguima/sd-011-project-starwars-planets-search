import React from 'react';
import FilterInput from '../components/FilterInput';
import FilterSelectors from '../components/FilterSelectors';
import OrderSelector from '../components/OrderSelector';
import Table from '../components/Table';

function Home() {
  return (
    <div>
      <OrderSelector />
      <FilterInput />
      <FilterSelectors />
      <Table />
    </div>
  );
}

export default Home;
