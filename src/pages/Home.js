import React from 'react';
import FilterInput from '../components/FilterInput';
import FilterSelectors from '../components/FilterSelectors';
import Table from '../components/Table';

function Home() {
  return (
    <div>
      <FilterInput />
      <FilterSelectors />
      <Table />
    </div>
  );
}

export default Home;
