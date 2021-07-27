import React from 'react';
import FilterInput from '../components/FilterInput';
import FilterNumbers from '../components/FilterNumbers';
import Table from '../components/Table';

export default function Home() {
  return (
    <div>
      <FilterInput />
      <FilterNumbers />
      <Table />
    </div>
  );
}
