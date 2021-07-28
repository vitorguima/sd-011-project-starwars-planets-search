import React from 'react';
import FilterInput from '../components/FilterInput';
import FilterValues from '../components/FilterValues';
import Table from '../components/Table';

export default function Home() {
  return (
    <div>
      <FilterInput />
      <FilterValues />
      <Table />
    </div>
  );
}
