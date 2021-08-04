import React from 'react';
import FilterForm from '../components/FilterForm';
import NumericFilter from '../components/NumericFilter';
import Table from '../components/Table';

export default function Main() {
  return (
    <>
      <FilterForm />
      <NumericFilter />
      <Table />
    </>
  );
}
